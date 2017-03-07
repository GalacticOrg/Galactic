'use strict';
/**
 * app/frontend/Connect/reducers/index.js
 * Copyright (c) 2016, WikiWeb
*/

const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const Edge = require('../models/edge');

 /**
  * Load
  */
 exports.load = function (req, res, next, id){
   Entity.load(id, function (err, entity) {
     if (!entity || (err && err.message==='Cast to ObjectId failed')) return next(new Error('Article not found'));
     if (err) return next(err);
     req.entity = entity;
     Edge.getNode(entity._id, function (err, edges){
       req.edges = edges;
       next();
     });
   });
 };

/* Web App Pages */
exports.home = function (req, res) {
  res.render('home/index', {
    title: 'Home'
  });
};

exports.connect = function (req, res) {
  res.render('connect/index', {
    title: 'Connect'
  });
};

exports.node = function (req, res) {
  const entity = req.entity;
  res.render('node/index', {
    title: entity.title,
    description: entity.description,
    image: entity.imageCDN.url ? entity.imageCDN.url : null
  });
};

exports.user = function (req, res) {
  res.render('user/index', {
    title: 'User'
  });
};

exports.firehose = function (req, res) {
  res.render('firehose/index', {
    title: 'Firehose'
  });
};

/*Static Pages*/

exports.analytics = function (req, res) {
  res.render('Analytics', {
    title: 'Analytics'
  });
};

exports.about = function (req, res) {
  res.render('About', {
    title: 'About'
  });
};

exports.faq = function (req, res) {
  res.render('FAQ', {
    title: 'FAQ'
  });
};

exports.privacy = function (req, res) {
  res.render('Privacy', {
    title: 'Privacy'
  });
};

exports.terms = function (req, res) {
  res.render('Terms', {
    title: 'Terms'
  });
};

exports.fivehundred = function (req, res, next) {
  res.render('TermyDoesnot', {
    title: 'Terms'
  });
  // next({message:'err', stack:['1','2']})
};
