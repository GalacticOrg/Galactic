'use strict';
/**
 * Copyright (c) 2016, Galactic
*/

const mongoose = require('mongoose')
const Article = mongoose.model('Entity');
const _ = require('lodash');
const extract = require('../../lib/extract')

exports.getSearchController = function (req, res) {



  res.send({
    id: req.query.q

  });

  // if (!article) {
  //   res.status(404).send(utils.errsForApi('Article not found!!'));
  // } else if (article) {
  //   res.send(article);
  // }
};
