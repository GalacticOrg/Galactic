'use strict';
/**
 * Copyright (c) 2016, Galactic
*/

const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const User = mongoose.model('User');
const _ = require('lodash');
const async = require('async')
const extract = require('../../lib/extract')
const utils = require('../../lib/utils')
const URLParse = extract.URLParse;
const Connection = require('../models/connection');

/**
 * Load
 */
exports.load = function (req, res, next, id){
  Entity.load(id, function (err, entity) {
    if (!entity || (err && err.message==='Cast to ObjectId failed')) return  res.status(404).send(utils.errsForApi('Page not found'));
    if (err) return  res.status(500).send( utils.errsForApi(err.errors || err) );
    req.entity = entity;
    Connection.getNode(entity._id, function(err, edges){
      req.edges = edges
      next();
    })

  });
};


/**
* Search API for Nodes
 */
exports.getEntityController = function (req, res) {
  const entity = req.entity
  const edges = req.edges
  if (!entity) {
    res.status(404).send(utils.errsForApi('Node not found!!'));
  } else {
    const object = entity.toJSON();
    //object.edges = edges;
    const entityIds = _.map(edges, '_idNode')
    const userIds = _.map(edges, '_idUser')


    Entity.find(
      { _id: {$in: entityIds }},
      '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
    .exec(function(err, entities){


      User.find(
        { _id: {$in: userIds }},
        'name username'
      )
      .exec(function(err, users){


        object.edges = edges.map(function(edge, i){
          return {
            entity: _.find(entities, { id: edge._idNode}),
            user: _.find(users, { id: edge._idUser})
          }
        });
        res.send(object);
      })
    })

  }
}
/**
 * Search API for Node and Scrape Page
 */
exports.getSearchController = function (req, res) {
  const q = req.query.q
  if (!q) return res.status(422).send(utils.errsForApi('Please Enter a URL'));

  async.waterfall([
      function(cb){
        var url = URLParse(q);
        if (url){
           cb(null, url);
        } else {
          cb({
            status: 200,
            isURL: false,
            node: null
          });
        }
      },
      pageDBSearch,
      pageExtractor,
      pageExtractorDBSearch,
      pageSaver,
      nodeCreator
  ], function(err, url, resultDB, extractedPageData){
      //Handle the end
      if (err &&
          (err.status === 404 || err.code )
      ) {
        console.log(err, 'getSearchController isURL = flase')
        res.send({
           node : null,
           isURL: false
        });
      } else if (err) {
        const status = err.status || 500;
        console.log(err, status,  'getSearchController err')
        res.status(status).json(err);
      } else {
        let payload = {
           node : resultDB.toObject(),
           isURL: true
        };
        payload.node.imageLoading = true;
        res.send(payload);
      }
  });
};


/**
 * @name   pageDBSearch
 * @desc   Searches the DB for the page.
 * @param  {string}      url
 * @param  {Function}    cb  a callback for the data.
 */
function pageDBSearch(url, cb) {
  Entity
    .findOne({'$or':[{ canonicalLink: url }, { queryLink: url }]})
    .exec(function(err, result){
        if (err){
          cb(err)
        } else if (result!==null) {
          cb(null, url, result);
        } else {
          cb(null, url, null);
        }
    });
}


/**
 * @name   pageExtractor
 * @desc   Logic to extact page data if we did not get a db response.
 * @param  {string}      url
 * @param  {object}    resultDB
 * @param  {Function}    cb  a callback for the data.
 */
const pageExtractor = function(url, resultDB, cb){
  if (resultDB){
    cb(null, url, resultDB, null);
  } else {
    extract.pageRequester(url, function(err, extractedPageData){
      cb(err, url, resultDB, extractedPageData);
    });
  }
}

/**
 * @name   pageExtractorDBSearch
 * @desc   Logic to extact page data with a canoncial link. This prvents duplicates.
 * @param  {string}      url
 * @param  {object}    resultDB
 * @param  {object}    extractedPageData
 * @param  {Function}    cb  a callback for the data.
 */
function pageExtractorDBSearch(url, resultDB, extractedPageData, cb) {

  if (extractedPageData && extractedPageData.canonicalLink){
    pageDBSearch(extractedPageData.canonicalLink, function(err, url, resultDBcanonicalLink){
      cb(err, url, resultDBcanonicalLink, extractedPageData);
    });
  } else{
    cb(null, url, resultDB, extractedPageData);
  }
};

/**
 * @name   pageSaver
 * @desc   Logic to extact save page data from extracted text data
 * @param  {string}      url
 * @param  {object}    resultDB
 * @param  {object}    extractedPageData
 * @param  {Function}    cb  a callback for the data.
 */
const pageSaver = function(url, resultDB, extractedPageData, cb){
  if (!resultDB){
    saveEntityToDB(extractedPageData, function(err, savedResultDB){
      cb(err, url, savedResultDB, extractedPageData);
    });
  } else {
    cb(null, url, resultDB, extractedPageData);
  }
}

/**
 * @name   Creates a connection
 * @desc   Saves the db to the entity
 * @param  {object}      result
 * @param  {Function}    cb  a callback for the data.
 */
const nodeCreator = function(url, resultDB, extractedPageData, cb){
  if (extractedPageData){
    Connection.createNode(
      resultDB._id,
      function (err, results) {
        cb(err, url, resultDB, extractedPageData);
    });
  } else{
    cb(null, url, resultDB, extractedPageData);
  }
}


/**
 * @name   saveEntityToDB
 * @desc   Saves the db to the entity
 * @param  {object}      result
 * @param  {Function}    cb  a callback for the data.
 */
const saveEntityToDB = function(result, cb){
  var entity = new Entity(result);
  extract.copyAssets(
    entity.image,
    entity.favicon,
    entity._id,
    function(err, results){
      entity.imageCDN = results[0];
      // if (results[1]===null){
      //   entity.favicon = null
      // }
      entity.faviconCDN = results[1];
      entity.save(function(err){
        if(err){
          console.log(err);
        }
      });
  });

  entity.save(function(err){
    cb(err, entity);
  });
}
