var Model = require('../model/models.js');


const landing = function (req, res) {
  res.render('landing');
};

const home = function (req, res) {
  res.render('home');
};

module.exports.main = function (req, res) {
  console.log(req.user?req.user.id:'nada', 'main main');

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
