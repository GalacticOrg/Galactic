'use strict';
/**
 * Copyright (c) 2016, WikiWeb
*/
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const Edge = require('../models/edge');
const User = mongoose.model('User');
const _ = require('lodash');
const pageSearch = require('../../lib/pageSearch')

/**
 * Load
 */
exports.load = function (req, res, next, id){
  Entity.load(id, function (err, entity) {
    if (!entity || (err && err.message==='Cast to ObjectId failed')) return  res.status(404).send(utils.errsForApi('Page not found'));
    if (err) return  res.status(500).send( utils.errsForApi(err.errors || err) );
    req.entity = entity;
    Edge.getNode(entity._id, function(err, edges){
      req.edges = edges
      next();
    })
  });
};

/**
* Entity API for Nodes
 */
exports.getEntityController = function (req, res) {
  const entity = req.entity;

  const edges = _.chain(req.edges)
    .groupBy('_idNode')
    .map(function(edgesGrouped, i ){
        const edgeSorted = _.sortBy(edgesGrouped,'createdAt');
        return {
          _idNode: edgeSorted[0]._idNode,
          _idLink: edgeSorted[0]._idLink,
          createdAt: edgeSorted[0].createdAt,
          edges:edgeSorted
        }
    }).value()

  const entityIds = _.map(req.edges, '_idNode')
  const userIds = _.map(req.edges, '_idUser')

  if (!entity) {
    res.status(404).send(utils.errsForApi('Node not found!!'));
  } else {
    const object = entity.toJSON();

    Edge.getNodeCount(entityIds.concat(entity.id), function(err, entityCount){
      if (err) return  res.status(500).send( utils.errsForApi(err.errors || err) );

      Entity.find(
        { _id: {$in:  entityIds}},
        '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
      .exec(function(err, entities){

        User.find(
          { _id: {$in: userIds }},
          'name username twitter'
        )
        .exec(function(err, users){
          object.entityCount =  entityCount[entity.id]?entityCount[entity.id].length:0;
          object.superEdges = edges.map(function(edge, i){
            return {
              entity: _.find(entities, { id: edge._idNode}),
              entityCount: entityCount[edge._idNode].length,
              createdAt: edge.createdAt,
              edges: edge.edges.map(function(e){
                return {
                  user:_.find(users, { id: e._idUser}),
                  createdAt: e.createdAt,
                  _id: e._idLink,
                  tags: e.tags?e.tags:[]
                }
              })
            }
          });
          res.send(object);
        })
      });//Entity.find
    });//Edge.getNodeCount
  }
}

/**
 * Search API for Node and Scrape Page
 */
exports.getSearchController = function (req, res) {
  const q = req.query.q
  if (!q) return res.status(422).send(utils.errsForApi('Please Enter a URL'));

  pageSearch(q, function(err, url, resultDB, extractedPageData){
      //Handle the end
      if (err &&
         (err.status === 404 || err.code )) { //Did we get a 404 from the search. We tell the search
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
        //Here is where we push all links to our child scrapper.

        const payload = {
           node : resultDB.toObject(),
           isURL: true
        };
        res.send(payload);
      }
  })
};


const scrapperQ = function(){

  const q = Q.pop()

  pageSearch(q, function(err, url, resultDB, extractedPageData){

  });

}

let Q =[];
