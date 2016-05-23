'use strict';
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');

exports.load = function (req, res, next, id){

  req.id = id;
  next();

  // Article.load(id, function (err, article) {
  //   if (!article || (err && err.message==='Cast to ObjectId failed')) return  res.status(404).send(utils.errsForApi('Article not found'));
  //   if (err) return  res.status(500).send( utils.errsForApi(err.errors || err) );
  //   req.article = article;
  //   next();
  // });
};

exports.getEntityController = function (req, res) {
  //var node = req.node

  res.send({id: 123, title: 'I rulz'});

  // if (!article) {
  //   res.status(404).send(utils.errsForApi('Article not found!!'));
  // } else if (article) {
  //   res.send(article);
  // }
};

exports.createEntityController = function (req, res) {




  entityOne = new Entity({url: 'https://newrepublic.com/article/133622/elizabeth-warrens-next-crusade'});

  entityTwo = new Entity({url: 'https://newrepublic.com/article/133625/hillary-clinton-know-attack-donald-trump'});






  // if (!article) {
  //   res.status(404).send(utils.errsForApi('Article not found!!'));
  // } else if (article) {
  //   res.send(article);
  // }
};


function loadOrCreateEntity () {

  //Entity.findOne()

}
