const diffBotAnalyze = require('../../utils/pageparser').diffBotAnalyze,
    isValidURI = require('../../utils/pageparser').isValidURI,
    pageParse = require('../../utils/pageparser').pageParse,
    pageParseNYT = require('../../utils/pageparser').pageParseNYT,
    Page = require('../model/page.js'),
    Tag = require('../model/Tag.js').tag,
    regexNYT = new RegExp('nyt.com|nytimes.com|newyorktimes.com');


const landing = function (req, res) {
  res.render('landing');
};

const home = function (req, res) {

  Page.feed().then(function (results){
    const pages = results.map(function (result){ return result.toJSON(); });
    res.render('home', {
      pages
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
  const page = pageObj.toJSON();
  let destinations = null;


    // const tags = [{
    //   "score": 0.53,
    //   "count": 1,
    //   "label": "Expedition Robinson",
    //   "uri": "http://dbpedia.org/page/Expedition_Robinson",
    //   "rdfTypes": [
    //   "http://dbpedia.org/ontology/TelevisionShow",
    //   "http://dbpedia.org/ontology/Work",
    //   "http://www.w3.org/2002/07/owl#Thing"
    //   ]
    // },{
    //   "score": 0.53,
    //   "count": 1,
    //   "label": "Expedition Robinson",
    //   "uri": "http://dbpedia.org/page/Expedition_Robinson2",
    //   "rdfTypes": [
    //   "http://dbpedia.org/ontology/TelevisionShow",
    //   "http://dbpedia.org/ontology/Work",
    //   "http://www.w3.org/2002/07/owl#Thing"
    //   ]
    // }]
  //   Page.findOne().then(function(){
  //     return tags.map(function(tag){
  //       return Tag.findOrCreate({
  //         where: { uri: tag.uri },
  //         defults: tag
  //       });
  //     });
  //   }).spread(function (){
  //       const tags = Array.prototype.slice.call(arguments);
  //       tags.forEach(function(array){
  //         const tag = array[0]
  //         const data = tag.toJSON();
  //         console.log(data, 'datadata')
  //         pageObj.addTag(tag, data)
  //       });
  //        res.send(tags);
  //     });
  //
  //
  // return false

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
      destinations
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
    page.addConnection(destinationPage, { userId: user.id }).then(function (){
      const pageObj = page.toJSON();
      res.redirect('/page/' + pageObj.wwUri);
    });
  });
};


module.exports.pageValidate = function(req, res){
  const inputURI = req.query.q;
  const user = req.user;

  if (regexNYT.test(inputURI)){
    pageParseNYT(inputURI.split("?")[0], function(err, article){
      if (err){
        return res.send(err)
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
        return res.send(err)
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
    })
  }
};


module.exports.search = function (req, res) {
  const inputURI = req.query.q;

  if (inputURI === undefined || inputURI.length === 0){
    return res.render('search', {
      pages: [],
      inputURI
    });
  };

  let uri = '';
  if (inputURI !== undefined && inputURI.search('https://') === -1 && inputURI.search('http://') === -1){
    uri = 'http://';
  }
  uri += inputURI;
  let pages = [];
  let addPage = null;
  if ( !isValidURI(uri) ) {
    const searchString = inputURI;
    Page.search(searchString).then(function (results){
      pages = results.map(function (result){
        return result.toJSON();
      });

      return res.render('search', {
        pages,
        inputURI
      });
    });
  } else {
    Page.load(uri).then(function (result){
      if (!result){
        return res.render('search', {
          pages: [],
          addURL: true,
          inputURI
        });
      } else {
        pages = [result];
        return res.render('search', {
          pages,
          inputURI
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
      req.flash('errors', {
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
          console.log(err)
          return console.log(page.id, '<--page.id, diffBotAnalyze failed');
        }
        const articleTags = article.tags;
        page.update({
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
  }).catch(function (err){
    console.log(err, 'module.exports.new DB Error');
    req.flash('errors', {
      message: 'Something Went Wrong. Please Try Again.',
      type: 'error'
    });
    res.redirect('back');
  });


  //
  //     //page
  //     // req.flash('error', err);
  //     // return res.render('search', {
  //     //   pages: []
  //     // });
  //   }
  //   Page.load(article.pageURL).then(function (result){
  //     if (!result){
  //       let wwUri = article.title.length > 4 ?
  //       article.title.replace(new RegExp(' ', 'g'), '_') :
  //       page.id;
  //       wwUri = wwUri.replace(new RegExp(/\W/, 'g'), '');
  //
  //       page.update({
  //         html: article.html,
  //         text: article.text,
  //         title: article.title,
  //         author: article.author,
  //         authorUrl: article.authorUrl,
  //         type: article.type,
  //         icon: article.icon,
  //         pageUrl: article.resolvedPageUrl || article.pageUrl,
  //         siteName: article.siteName,
  //         humanLanguage: article.humanLanguage,
  //         diffbotUri: article.diffbotUri,
  //         videos: article.videos,
  //         authors: article.authors,
  //         images: article.images,
  //         userId:user.id,
  //         meta: article.meta,
  //         description:  article.meta ? article.meta.description : '',
  //         wwUri: wwUri
  //       }).then(function (){
  //         console.log('save success');
  //       }).catch(function (){
  //         console.log('save failed');
  //       });
  //     } else {
  //       // No Opps
  //     }
  //   });
  // });
};

module.exports.main = function (req, res) {

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
