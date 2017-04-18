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

module.exports.test = function (req, res) {
  const url = 'https://newrepublic.com/article/142074/appalachia-needs-big-government';

  parser(url, function (err, article){
    if (err){
      return res.send(err);
    }
    // res.json(article);
    // return
    // r
    const page = Page.saveDiffBotResult(article.objects[0], req.user).then(function(result){
      res.json(result);
    });


  });
};

// module.exports.test = function (req, res) {
//   const pageId = 'CE212FC5-2CB9-4A19-BED2-9B7D19E1599E';
//   // Connection.findAll({pageId:''})
//   Page.findOne(
//     { id:pageId, include:[{model: User}]}
//   )
//     .then(function(page){
//       res.send(page)
//     // page.getUser().getConnections().then(function(user){
//     //   res.send({
//     //     user,
//     //     page
//     //
//     //   })
//     // });
//   })
// };

module.exports.main = function (req, res) {

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
