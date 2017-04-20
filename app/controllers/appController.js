var parser = require('../../utils/pageparser').diffBotAnalyze,
    isValidURI = require('../../utils/pageparser').isValidURI,
    Page = require('../model/page.js'),
    Connection = require('../model/Connection.js');


const landing = function (req, res) {
  res.render('landing');
};

const home = function (req, res) {
  res.render('home');
};

// module.exports.test = function (req, res) {
//   const url = 'https://newrepublic.com/article/142074/appalachia-needs-big-government';
//
//   parser(url, function (err, article){
//     if (err){
//       return res.send(err);
//     }
//     // res.json(article);
//     // return
//     // r
//     const page = Page.saveDiffBotResult(article.objects[0], req.user).then(function(result){
//       res.json(result);
//     });
//
//
//   });
// };

// Connection.findAll({pageId:''})
// Page.findOne(
//   { id:pageId, include:[{model: User}]}
// )
//   .then(function(page){
//
//   page.getConnections().then(function(connection){
//     res.send({
//       connection,
//     })
//   });
// });

module.exports.page = function (req, res) {
  console.log(req.url, 'page hit')
  const pageId =  req.url.replace('/page/','');
  Page.loadPage(pageId).then(function (result){
    if (result === null){
      res.render('404');
    } else {
      const page = result.dataValues;
      console.log(page, 'page')
      //return res.send(page)
      res.render('page', {
        page
      });
    }

  });
};

module.exports.search = function (req, res) {
  const inputURI = req.query.q;

  if (inputURI === undefined || inputURI.length === 0){
    return res.render('search', {
      pages: []
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
        return result.dataValues;
      });
      return res.render('search', {
        pages
      });
    });
  } else {
    Page.load(uri).then(function (result){
      if (!result){
        parser(uri, function (err, article){
          if (err){
            req.flash('error', err);
            return res.render('search', {
              pages: []
            });
          }
          Page.load(article.pageURL).then(function (result){
            if (!result){
              Page.saveDiffBotResult(article.objects[0])
                .then(function (result){
                addPage = result;
                return res.render('search', {
                  pages,
                  addPage
                });
              });
            } else {
              if (result.userId !== null){
                pages = [result];
              } else {
                addPage = result
              }
              return res.render('search', {
                pages,
                addPage
              });
            }
          });

        });
      } else {
        if (result.userId !== null){
          pages = [result];
        } else {
          addPage = result
        }
        return res.render('search', {
          pages,
          addPage
        });
      }
    });
  }
};

/* TODO. RESULT IS CURRENTLY A DIRECT COPY OF SEARCH. @mceoin */
module.exports.result = function (req, res) {
  const inputURI = req.query.q;

  if (inputURI === undefined || inputURI.length === 0){
    return res.render('result', {
      pages: []
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
        return result.dataValues;
      });
      return res.render('result', {
        pages
      });
    });
  } else {
    Page.load(uri).then(function (result){
      if (!result){
        parser(uri, function (err, article){
          if (err){
            req.flash('error', err);
            return res.render('result', {
              pages: []
            });
          }
          Page.load(article.pageURL).then(function (result){
            if (!result){
              Page.saveDiffBotResult(article.objects[0])
                .then(function (result){
                addPage = result;
                return res.render('result', {
                  pages,
                  addPage
                });
              });
            } else {
              if (result.userId !== null){
                pages = [result];
              } else {
                addPage = result
              }
              return res.render('result', {
                pages,
                addPage
              });
            }
          });

        });
      } else {
        if (result.userId !== null){
          pages = [result];
        } else {
          addPage = result
        }
        return res.render('result', {
          pages,
          addPage
        });
      }
    });
  }
};

module.exports.main = function (req, res) {

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
