'use strict';




exports.getController = function (req, res) {
  //var node = req.node

  res.send({id: req.query['q'], title: 'I rulz'});

  // if (!article) {
  //   res.status(404).send(utils.errsForApi('Article not found!!'));
  // } else if (article) {
  //   res.send(article);
  // }
};
