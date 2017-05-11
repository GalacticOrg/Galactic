const diffBotAnalyze = require('../../utils/pageparser').diffBotAnalyze,
    Sequelize = require('sequelize'),
    _ = require('lodash'),
    sequelizeConnection = require('../model/sequelize.js'),
    Jimp = require('jimp'),
    pareLinksHtml = require('../../utils/pageparser').pareLinksHtml,
    isValidURI = require('../../utils/pageparser').isValidURI,
    pageParse = require('../../utils/pageparser').pageParse,
    pageParseNYT = require('../../utils/pageparser').pageParseNYT,
    uploadBuffer = require('../../utils/assets').uploadBuffer,
    Page = require('../model/page.js'),
    User = require('../model/user.js'),
    Connection = require('../model/connection.js'),
    Tag = require('../model/tag.js').tag,
    regexNYT = new RegExp('nyt.com|nytimes.com|newyorktimes.com'),
    userAttibutrs = ['username', 'displayName', 'id', 'avatar'],
    url = require('url');

const landing = function (req, res) {
  res.render('landing');
};

const about = function (req, res) {
  res.render('about');
};

const home = function (req, res) {
  const user = req.user.toJSON();
  const limit = req.query.limit || 30;
  const offset = req.query.offset || 0;
  let pages = null;
  let feed = null;

  const filter = req.query.filter;

  let filters = {
    //userId: { $ne:null }
  };

  //if (filter === 'requests') {
  //  filters.isConnected = { $not : true };
  // } else if (filter === 'connections'){
  filters.isConnected = { $not : false };
  // }

  Page.findAll({
    limit: limit ,
    offset: offset,
    include:[{ model: User, attributes:userAttibutrs }, { model: Tag, as: 'tag' }, { model: Page, as: 'connections' }],
    order: [
      ['lastActivityAt', 'DESC']
    ],
    where: filters
  }).then(function (results){
    pages = results.map(function (result){ return result.toJSON(); });
    return results.map(function (result){
      if  (result.connections.length >  0){
        return result.connections[0].connection.getUser();
      } else {
        return null;
      }
    });
  }).spread(function (){
    const users = arguments;
    feed = pages.map(function (page, i){
      let newPage = page;
      if ( page.connections[0] ){
        newPage.userWhoMadeConnection = users[i].toJSON();
      }
      return newPage;
    });
    return [Page.count({ where: { userId:user.id } }),Connection.count({ where: { userId:user.id } })]
  }).spread(function (userPageCount, userConnectionCount){
    res.render('home', {
      feed,
      user,
      userPageCount,
      userConnectionCount,
      limit: Number(limit) + 30,
      offset: Number(offset) + 30
    });
  });
};

module.exports.requests = function (req, res) {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const user = req.user.toJSON();

  let filters = {
    userId: { $ne:null }
  };

  Page.findAll({
    limit: limit || 30,
    offset: offset || 0,
    include:[{ model: User, attributes:userAttibutrs }, { model: Tag, as: 'tag' }, { model: Page, as: 'connections' }],
    order: [
      ['lastActivityAt', 'DESC']
    ],
    where: filters
  }).then(function (results){
    const pages = results
    return res.render('requests', {
      pages,
      user
    });
  });
};


module.exports.connections = function (req, res) {
  let pages,
    destinations,
    userConnections;
  const user = req.user;

  sequelizeConnection
  .query('SELECT *, connection."userId", users.id, username, "displayName", avatar FROM connection INNER JOIN pages ON "connectionPage" = pages.id INNER JOIN users ON connection."userId" = users.id')
  .then(function (results){
    pages = results[0];
    return sequelizeConnection.query('SELECT * FROM connection INNER JOIN pages ON "destinationPage" = pages.id');
  }).then(function (results){
    destinations = results[0];
    return sequelizeConnection.query('SELECT users.id, username, "displayName", avatar FROM connection INNER JOIN users ON "userId" = users.id');
  }).then(function (results){
    userConnections = results[0];
    const connections = pages.map(function (page, i){
      const newPage = page;
      newPage.connections = [destinations[i]];
      newPage.userWhoMadeConnection =  userConnections[i];
      return newPage;
    });
    return res.render('connections', {
      connections,
      user
    });
  });
};

module.exports.loadwwid = function (req, res, next, id) {
  Page.loadPage(id).then(function (result){
    if (result === null){
      res.render('404', {
      });
    } else {
      req.page = result;
      next();
    }
  });
};


module.exports.page = function (req, res) {
  const pageObj = req.page;
  const user = req.user;

  let page = pageObj.toJSON();
  let destinations = null;
  let destinationTags = null;
  let links = null;
  let linkTags = null;
  const topicFilter = req.query.topic;

  pageObj.getUser().then(function (result){
    page.user = result? result.toJSON(): null;
    return pageObj.getConnections();
  }).then(function (result){
    destinations = result;
    return pageObj.getTag();
  }).then(function (results){
    page.tags = results.map(function (result){ return result.toJSON();});
    return destinations.map(function (destination){
       return destination.getTag();
    });
  }).spread(function (){
    destinationTags = Array.prototype.slice.call(arguments);
    destinations = destinations.map(function (result, i){
      let connection = result.toJSON();
      connection.tags = destinationTags[i];
      return connection;
    });
    if (topicFilter && topicFilter.length){
      destinations = destinations.filter(function (connection){
        return connection.tags.find(function (tag){ return tag.label.toLowerCase() === topicFilter.toLowerCase(); }) !== undefined;
      });
    }
  }).then(function (){
    return pageObj.getLinks();
  }).then(function(){
    links = Array.prototype.slice.call(arguments)[0];
    return links.map(function(link){
      return link.getTag();
    });
  }).spread(function (){
    linkTags = Array.prototype.slice.call(arguments);
    links = links.map(function (result, i){
      let connection = result.toJSON();
      connection.tags = linkTags[i];
      return connection;
    });
    if (topicFilter && topicFilter.length){
      links = links.filter(function (connection){
        return connection.tags.find(function (tag){ return tag.label.toLowerCase() === topicFilter.toLowerCase(); }) !== undefined;
      });
    }
    return destinations.map(function (destination){
       return destination.connection.getUser(); // get rid of password here
    });
  }).spread(function (){
    const users = Array.prototype.slice.call(arguments);
    destinations = destinations.map(function (result, i){
      let connection = result;
      connection.user = users[i].toJSON();
      return connection;
    });
    let tags = [].concat.apply([], destinationTags);
        tags = destinationTags.concat.apply([], linkTags);
    let tagsUnique = _.uniqBy(tags, 'id');

    tagsUnique = tagsUnique.map(function(data){
      let tagUnique = data.toJSON();
      let count = 0;
      tags.forEach(function(tag){
        if (tag.id === tagUnique.id){
          count +=1;
        }
      })
      tagUnique.count = count;
      return tagUnique;
    });

    tagsUnique = _.sortBy(tagsUnique, function(obj) {
        return -obj.count;
    });

    let connectionUsers = _.uniqBy(users, 'id');
    res.render('page',{
      page,
      destinations,
      user,
      connectionUsers,
      tags: tagsUnique,
      links
    });
  });
};

module.exports.connect = function (req, res) {
  const page = req.page;
  const user = req.user;
  const id = req.body.id;
  if ( id === undefined || id.length === 0) {
    req.flash('errors', {
      message: 'Something Went Wrong. Please Try Again.',
      type: 'error'
    });
    return res.redirect('/page/' + page.wwUri);
  }
  Page.findOne({ where:{ id:id } }).then(function (destinationPage){
    const promsies = [
      page.set({ lastActivityAt: Sequelize.fn('NOW'), isConnected: true }).save(),
      page.addConnection(destinationPage, { userId: user.id })
    ];
    return promsies;
  }).then(function (){
    const pageObj = page.toJSON();
    res.redirect('/page/' + pageObj.wwUri);
  });
};

function createWwUri (title){
  let uri = title.replace(new RegExp(' ', 'g'), '_');
  uri = uri.replace(new RegExp(/\W/, 'g'), '');
  uri += '_' + new Date().getTime().toString(36);
  return uri;
}

module.exports.pageValidate = function (req, res){
  const inputURI = req.query.q;
  pageValidate(inputURI, function(err, result){
    if (err){
      return res.send(err);
    } else {
      res.send(result);
    }
  });
};

function pageValidate(inputURI, cb){
  if (regexNYT.test(inputURI)){
    pageParseNYT(inputURI.split('?')[0], function (err, article){
      if (err){
        return cb(err);
      }
      const uri = article.web_url;
      Page.load(uri).then(function (result){
        if (!result){
          let wwUri = createWwUri(article.headline.main);
          Page.create({
            title: article.headline.main,
            icon: 'http://www.nytimes.com/favicon.ico',
            pageUrl: uri,
            description: article['lead_paragraph'],
            wwUri: wwUri
          }).then(function (createResult){
            cb(err, createResult);
          });
        } else {
          cb(err, result);
        }
      });
    });
  } else {
    pageParse(inputURI, function (err, article){
      if (err){
        return cb(err);
      }
      const uri = article.canonicalLink || inputURI;
      Page.load(uri).then(function (result){
        if (!result){
          let wwUri = createWwUri(article.title);
          let favicon = article.favicon;
          if (favicon && (favicon.search('http://') === -1 || favicon.search('https://') === -1) ){
            const urlObj = url.parse(uri);
            favicon = 'http://' + urlObj.hostname + article.favicon;
          }
          Page.create({
            text: article.text,
            title: article.title,
            icon: favicon,
            pageUrl: uri,
            humanLanguage: article.lang,
            description: article.description,
            wwUri: wwUri
          }).then(function (createResult){
            cb(err, createResult);
          });
        } else {
          cb(err, result);
        }
      });
    });
  }
}

module.exports.search = function (req, res) {
  const inputURI = req.query.q;
  const user = req.user.toJSON();
  if (inputURI === undefined || inputURI.length === 0){
    return res.render('search', {
      pages: [],
      inputURI,
      user
    });
  }

  let uri = '';
  if (inputURI !== undefined && inputURI.search('https://') === -1 && inputURI.search('http://') === -1){
    uri = 'http://';
  }
  uri += inputURI;
  let pages = [];
  if ( !isValidURI(uri) ) {
    const searchString = inputURI;
    const searchWordsArray = searchString.split(' ');
    const searchExpressionArray = searchWordsArray.map((item) => {
        return { $iLike: '%' + item + '%' };
    });
    return Page.findAll({
      where:{
        $or: [{
          title:{ $or:searchExpressionArray }
        },{
          description:{ $or:searchExpressionArray }
        }]
      },
      include:[{ model: User, attibutrs:userAttibutrs }, { model: Tag, as: 'tag' }, { model: Page, as: 'connections' }]
    }).then(function (results){
      pages = results.map(function (result){
        return result.toJSON();
      });

      return res.render('search', {
        pages,
        inputURI,
        user
      });
    });
  } else {
    Page.load(uri).then(function (result){
      if (!result){
        pageValidate(uri, function (err, result){
          if (err){
            req.flash('errors', {
              message: 'Something Went Wrong. Please Try Again.',
              type: 'error'
            });
            return res.render('search', {
              pages,
              inputURI,
              user
            });
          } else {
            res.redirect('/page/' + result.wwUri + '?pp=true');
          }
        });
      } else {
        res.redirect('/page/' + result.wwUri);
        // return res.render('search', {
        //   pages,
        //   inputURI,
        //   user
        // });
      }
    });
  }
};

module.exports.new = function (req, res) {
  //const id = req.body.id;
  const user = req.user;
  const page = req.page;
  // Page.findOne({
  //   where:{
  //      id: id
  //   }
  // }).then(function (page){
    if (page.isParsed === true){
    //   req.flash('errors', {
    //     message: 'Something Went Wrong. Please Try Again.',
    //     type: 'error'
    //   });
      return res.send({
        isParsed: true
      });
    } else {
      const getLinks = true;
      pageParser(page.pageUrl, page, getLinks, function (err){
        res.send({
          isParsed: true,
          newParse: true,
          page
        });
      });
    }
  // });
};

function pageParser (url, page, getLinks, cb){
  diffBotAnalyze(url, function (err, article) {

    if (err || !article || !article.title){
      console.log(err, '<--page.id, diffBotAnalyze failed');
      return cb('diffBotAnalyze failed')
    }

    Page.findOne({where:{
      isParsed:{ $ne:false },
      pageUrl: { $or: [article.resolvedPageUrl, article.pageUrl] }
    } }).then(function (result){

      if (result){
        return cb(null, result);
      }

      if (article.html && getLinks){
        const articleLinks = pareLinksHtml(article.html);
        articleLinks.forEach(function (link){
          const crawlLink = false;
          Page.create().then(function (newPage){
            pageParser(link, newPage,  crawlLink, function (err) {
              if (err) return false;
              page.addLink(newPage);
              console.log('Link page Added');
            });
          });

        });
      }

      const articleTags = article.tags || [];

      return page.update({
        text: article.text,
        html: article.html,
        title: article.title,
        author: article.author,
        authorUrl: article.authorUrl,
        type: article.type,
        icon: article.icon,
        pageUrl: article.resolvedPageUrl || article.pageUrl,
        siteName: article.siteName,
        humanLanguage: article.humanLanguage,
        diffbotUri: article.diffbotUri,
        videos: article.videos,
        authors: article.authors,
        images: article.images,
        meta: article.meta,
        description:  article.meta ? article.meta.description : '',
        isParsed: true,
        wwUri: page.wwUri || createWwUri(article.title)
      }).then(function (){
        return articleTags.map(function (tag){
          return Tag.findCreateFind({
            where: { uri: tag.uri },
            defaults: tag
          });
        });
      }).spread(function (){
        const spreadTag = Array.prototype.slice.call(arguments);
        return spreadTag.map(function (array, i){
          const tag = array[0];
          const data = articleTags[i];
          page.addTag(tag, data);
        });
      }).spread(function (result){
        cb(null, result);
      }).catch(function (err){
        console.log(err, '<-- parse error')
        cb(err);
      });
    });// end of find one

  });
}

module.exports.main = function (req, res) {
  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};


module.exports.profile = function (req, res) {
  const user = req.user;
  res.render('profile', {
    user
  });
};

module.exports.about = function (req, res) {
  res.render('about');
};

module.exports.updateProfile = function (req, res) {
  const image = req.file;
  const user = req.user;
  const uid = user.toJSON().id;
  let update = req.body;

  if (!image ){
    user.update(update).then(function (){
      res.redirect('/profile');
    });
  } else if ( image.mimetype === 'image/jpeg' ){

    Jimp.read(image.buffer, function (err, lenna) {
        if (err) throw err;
        lenna.resize(140, 140)
             .quality(72)
             .getBuffer(image.mimetype, function (err, result){
               if (err) {
                console.log(uid, err, '<--user id, Jimp profile pic failed, ');
                req.flash('errors', {
                   message: 'We had a problem. Please try again.',
                   type: 'error'
                 });
                return res.redirect('back');
               }
               uploadBuffer(
                 result,
                 result.byteLength,
                 uid,
                 function (err, url){
                   if (err){
                     req.flash('errors', {
                       message: 'Please choose a photo',
                       type: 'error'
                     });
                     return res.redirect('back');
                   }
                   update.avatar = url;
                   user.update(update).then(function (){
                     res.redirect('/profile');
                   });
                 });
             }); // resize  Jimp
    });

  } else {
    req.flash('errors', {
      message: 'Please enter a JPG photo',
      type: 'error'
    });
    return res.redirect('back');
  }
};
