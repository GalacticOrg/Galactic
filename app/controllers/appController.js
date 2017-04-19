var parser = require('../../utils/pageparser'),
    Page = require('../model/page.js'),
    User = require('../model/user.js'),
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

module.exports.loadurl = function (req, res, next, id) {
  Page.findPage(id).then(function(){
    parser
  });
};

module.exports.page = function (req, res) {

};

module.exports.search = function (req, res) {

};

module.exports.main = function (req, res) {

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
