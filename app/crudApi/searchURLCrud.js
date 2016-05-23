'use strict';
/**
 * Copyright (c) 2016, Galactic
*/

const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const _ = require('lodash');
const extract = require('../../lib/extract')

exports.getSearchController = function (req, res) {



  // let entityOne = new Entity({
  //   canonicalURL: 'newrepublic.com/article/133622/elizabeth-warrens-next-crusade',
  // });
  //
  // entityOne.save((err, result)=>{
  //   console.log(err, result);
  // })

  const url = extract.URLParse(req.query.q);
  if (url){
    Entity.findOne({canonicalURL: url}, function(err,  node){
      const isURL = true;
      res.send({
        node,
        isURL
      });

    });
  }else{
    res.send({
      isURL: false,
      node: {}
    });
  }







  // if (!article) {
  //   res.status(404).send(utils.errsForApi('Article not found!!'));
  // } else if (article) {
  //   res.send(article);
  // }
};
