var parser = require('../../utils/pageparser').diffBotAnalyze,
    isValidURI = require('../../utils/pageparser').isValidURI,
    Page = require('../model/page.js'),
    Connection = require('../model/Connection.js');


const landing = function (req, res) {
  res.render('landing');
};

const home = function (req, res) {
  req.flash(
  'errors',
  [{
    message:'Example of Error.',
    type: 'error'
  },
  {
    message:'Example of Info.',
    type: 'info'
  },
  {
    message:'Example of Success.',
    type: 'success'
  },
  {
    message:'Example of Warning.',
    type: 'warning'
  }]);

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
      next(new Error('Article not found'));
    } else {
      req.page = result.toJSON();
      next();
    }
  });
};

module.exports.loaduid = function (req, res, next, id) {
  Page.findOne({
    where:{
      $or: [{ id: id }]
    }
  }).then(function (result){
    if (result === null){
      next(new Error('Article not found'));
    } else {
      if ( result.dataValues.wwUri !== result.dataValues.id ) {
          return res.redirect( '/page/' + result.dataValues.wwUri );
      } else {
        req.page = result.dataValues;
        next();
      }

    }
  });
}

module.exports.page = function (req, res) {
  const page = req.page;
  res.render('page', {
    page
  });
};

module.exports.newpage = function (req, res) {
  const page = req.page;
  res.render('newpage', {
    page
  });
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
      pages = results.map(function(result){
        return result.toJSON();
      });
      // Toggle to see data
      // return res.send(pages)
      return res.render('search', {
        pages,
        inputURI
      });
    });
  } else {
    Page.load(uri).then(function (result){
      if (!result){
        // parser(uri, function (err, article){
        //   if (err){
        //     req.flash('error', err);
        //     return res.render('search', {
        //       pages: []
        //     });
        //   }
        //   Page.load(article.pageURL).then(function (result){
        //     if (!result){
        //       Page.saveDiffBotResult(article.objects[0])
        //         .then(function (result){
        //         addPage = result;
        //         return res.render('search', {
        //           pages,
        //           addPage
        //         });
        //       });
        //     } else {
        //       if (result.userId !== null){
        //         pages = [result];
        //       } else {
        //         addPage = result
        //       }
              return res.render('search', {
                pages: [],
                addURL: true,
                inputURI
              });
        //     }
        //   });
        //
        // });
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
  const uri = req.body.uri;
  const user = req.user;
  if (!isValidURI(uri)) {
    req.flash(
    'errors',
    [{
      message:'Please enter a valid URL.',
      type: 'error'
    }]);
    return res.redirect('/');
  }

  const page = Page.build();

  page.wwUri = page.id;

  page.save().then(function(result){
      res.redirect('/newpage/'+result.wwUri);
  });

  parser(uri, function (err, article){
    if (err){

      page
      // req.flash('error', err);
      // return res.render('search', {
      //   pages: []
      // });
    }
    Page.load(article.pageURL).then(function (result){
      if (!result){
        let wwUri = article.title.length > 4 ?
        article.title.replace(new RegExp(' ', 'g'), '_') :
        page.id;
        wwUri = wwUri.replace(new RegExp(/\W/, 'g'), '');

        page.update({
          html: article.html,
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
          userId:user.id,
          meta: article.meta,
          description:  article.meta ? article.meta.description : '',
          wwUri: wwUri
        }).then(function (){
          console.log('save success');
        }).catch(function (){
          console.log('save failed');
        });
      } else {
        // No Opps
      }
    });
  });
};

module.exports.main = function (req, res) {

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
