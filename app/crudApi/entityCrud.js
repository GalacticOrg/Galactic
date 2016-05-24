'use strict';
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');

exports.load = function (req, res, next, id){
  req.id = id;
  next();
};

exports.getEntityController = function (req, res) {

  res.send({id: 123, title: 'I rulz'});
};

exports.createEntityController = function (req, res) {


  entityOne = new Entity({url: 'https://newrepublic.com/article/133622/elizabeth-warrens-next-crusade'});

  entityTwo = new Entity({url: 'https://newrepublic.com/article/133625/hillary-clinton-know-attack-donald-trump'});


};
