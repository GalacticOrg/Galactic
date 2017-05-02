const diffBotAnalyze = require('../../utils/pageparser').diffBotAnalyze,
    Sequelize = require('sequelize'),
    Jimp = require('jimp'),
    isValidURI = require('../../utils/pageparser').isValidURI,
    pageParse = require('../../utils/pageparser').pageParse,
    pageParseNYT = require('../../utils/pageparser').pageParseNYT,
    uploadBuffer = require('../../utils/assets').uploadBuffer,
    Page = require('../model/page.js'),
    User = require('../model/user.js'),
    Tag = require('../model/tag.js').tag,
    regexNYT = new RegExp('nyt.com|nytimes.com|newyorktimes.com');

const landing = function (req, res) {
  res.render('landing');
};


const home = function (req, res) {
  const user = req.user.toJSON();
  const limit = req.query.limit;
  const offset = req.query.limit;
  let pages = null;
  let feed = [];

  const filter = req.query.filter;

  let filters = {
    userId: { $ne:null }
  };

  if (filter === 'requests') {
    filters.isConnected = { $not : true };
  } else if (filter === 'connections'){
    filters.isConnected = { $not : false };
  }

  Page.findAll({
    limit: limit || 20,
    offset: offset || 0,
    include:[{ model: User }, { model: Tag, as: 'tag' }, { model: Page, as: 'connections' }],
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
    res.render('home', {
      feed,
      user
    });
  });
};

// @TODO Placeholders for connections and response
module.exports.requests = function (req, res) {
  return res.render('requests', {
    pages: []
  });
};


module.exports.connections = function (req, res) {
  const user = req.user;
  return res.render('requests', {
    pages: [],
    user
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
  const page = pageObj.toJSON();
  const user = req.user;

  let destinations = null;

  pageObj.getUser().then(function (result){
    page.user = result.toJSON();
    return pageObj.getConnections();
  }).then(function (result){
    destinations = result;
    return pageObj.getTag();
  }).then(function (results){
    page.tags = results.map(function (result){ return result.toJSON();});
    return destinations.map(function (destination){
       return destination.connection.getUser();
    });
  }).spread(function (){
    const users = arguments;
    destinations = destinations.map(function (result, i){
      let connection = result.toJSON();
      connection.user = users[i].toJSON();
      return connection;
    });
    res.render('page', {
      page,
      destinations,
      user
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


module.exports.pageValidate = function (req, res){
  const inputURI = req.query.q;

  if (regexNYT.test(inputURI)){
    pageParseNYT(inputURI.split('?')[0], function (err, article){
      if (err){
        return res.send(err);
      }
      const uri = article.web_url;
      Page.load(uri).then(function (result){
        if (!result){
          let wwUri = article.headline.main.replace(new RegExp(' ', 'g'), '_');
          wwUri = wwUri.replace(new RegExp(/\W/, 'g'), '');
          Page.create({
            title: article.headline.main,
            icon: 'http://www.nytimes.com/favicon.ico',
            pageUrl: uri,
            description: article['lead_paragraph'],
            wwUri: wwUri
          }).then(function (createResult){
            res.send(createResult);
          });
        } else {
          res.send(result);
        }
      });
    });
  } else {
    pageParse(inputURI, function (err, article){
      if (err){
        return res.send(err);
      }
      const uri = article.canonicalLink || inputURI;
      Page.load(uri).then(function (result){
        if (!result){
          let wwUri = article.title.replace(new RegExp(' ', 'g'), '_');
          wwUri = wwUri.replace(new RegExp(/\W/, 'g'), '');
          Page.create({
            text: article.text,
            title: article.title,
            icon: article.favicon,
            pageUrl: uri,
            humanLanguage: article.lang,
            description: article.description,
            wwUri: wwUri
          }).then(function (createResult){
            res.send(createResult);
          });
        } else {
          res.send(result);
        }
      });
    });
  }
};


module.exports.search = function (req, res) {
  const inputURI = req.query.q;
  const user = req.user.toJSON();
  console.log(user, 'useruser');
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
    Page.search(searchString).then(function (results){
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
        return res.render('search', {
          pages: [],
          addURL: true,
          inputURI,
          user
        });
      } else {
        pages = [result];
        return res.render('search', {
          pages,
          inputURI,
          user
        });
      }
    });
  }
};

module.exports.new = function (req, res) {
  const id = req.body.id;
  const user = req.user;
  Page.findOne({
    where:{
       id: id
    }
  }).then(function (page){
    if (page === null){
      return req.flash('errors', {
        message: 'Something Went Wrong. Please Try Again.',
        type: 'error'
      });
      res.redirect('back');
    } else {
      page.setUser(user).then(function (result){
        res.redirect('/page/' + result.wwUri);
      });

      diffBotAnalyze(page.pageUrl, function (err, article) {
        if (err){
          return console.log(page.id, err, '<--page.id, diffBotAnalyze failed');
        }
        const articleTags = article.tags;
        return page.update({
          text: article.text,
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
          description:  article.meta ? article.meta.description : ''
        }).then(function (){
          return articleTags.map(function (tag){
            return Tag.findCreateFind({
              where: { uri: tag.uri },
              defaults: tag
            });
          });
        }).spread(function (){
          const spreadTag = Array.prototype.slice.call(arguments);
          spreadTag.forEach(function (array, i){
            const tag = array[0];
            const data = articleTags[i];
            page.addTag(tag, data).then(function (){
              console.log('Save Successful');
            });
          });
        });
      });
    }
  });
};

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

    // open a file called "lenna.png"
    Jimp.read(image.buffer, function (err, lenna) {
        if (err) throw err;
        lenna.resize(140, 140)            // resize
             .quality(72)                 // set JPEG quality
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
