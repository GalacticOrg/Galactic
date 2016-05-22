'use strict';


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
  //var node = req.node

  res.send({id: 123, title: 'I rulz'});

  // if (!article) {
  //   res.status(404).send(utils.errsForApi('Article not found!!'));
  // } else if (article) {
  //   res.send(article);
  // }
};
