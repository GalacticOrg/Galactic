var parser = require('../../utils/pageparser');


const landing = function (req, res) {
  res.render('landing');
};

const home = function (req, res) {
  res.render('home');
};

module.exports.test = function (req, res) {
  const url = 'https://newrepublic.com/article/142044/art-new-york-times-obituary';
  parser(url, function (err, article){
    if (err){
      return res.send(err);
    }
    res.json(article);
  });
};

module.exports.main = function (req, res) {

  if (req.isAuthenticated()){
    home(req, res);
  } else {
    landing(req, res);
  }
};
