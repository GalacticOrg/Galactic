'use strict';
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const User = mongoose.model('User');
const Edge = require('../models/edge');
const utils = require('../../lib/utils')
const _ = require('lodash');

exports.load = function (req, res, next, username){
  const options = {
    criteria: { username : username }
  };
  User.load(options, function (err, user) {
    if (err && err.name == 'CastError' || !user){
      return res.status(404).send( utils.errsForApi('Not Found') )
    } else if (err) {
      return res.status(500).send( utils.errsForApi(err) )
    }
    req.profile = user;
    const id = user._id
    Edge.getUserEdges(id, function(err, edges){
      req.userEdges=edges;
      next();
    })

  });
};

/**
 * * Get Edges API
 */
 exports.getEdgeController = function (req, res) {
   const edges = req.userEdges;
   const entityIds = _.map(edges, '_idNodeFrom').concat(_.map(edges, '_idNodeTo'))

   Entity.find(
       { _id: {$in: entityIds }},
       '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
     .exec(function(err, entities){

       const object = edges.map(function(edge, i){
         console.log()
         return {
           nodeFrom :  _.find(entities, { id: edge._idNodeFrom}),
           nodeTo : _.find(entities, { id: edge._idNodeTo}),
           createdAt: edge.createdAt
         }
       })
       res.send(object)
     });
 }

 /**
  * * Get Edges API
  */
  exports.getEdgeController = function (req, res) {
    Edge.getEdges(35, function(err, edges){
      const entityIds = _.map(edges, '_idNodeFrom').concat(_.map(edges, '_idNodeTo'))
      Entity.find(
        { _id: {$in: entityIds }},
        '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
      .exec(function(err, entities){

        const object = edges.map(function(edge, i){
          console.log()
          return {
            nodeFrom :  _.find(entities, { id: edge._idNodeFrom}),
            nodeTo : _.find(entities, { id: edge._idNodeTo}),
            createdAt: edge.createdAt
          }
        })
        res.send(object)
      });
    })
  }


/**
 * * Create Edges API
 */
exports.postCreateEdgeController = function (req, res) {
  const body = req.body;
  const toId = body.toId;
  const fromId = body.fromId;
  const userId = req.user.id

  Edge.createEdge(
    fromId,
    toId,
    userId,
    function(err, resultEdge){
      if (err) {
        console.log(err, "postCreateEdgeController")
        res.status(400).send(utils.errsForApi(err.errors || err));
      } else {
        Entity.update(
           { _id: {$in: [fromId, toId]}},
           { $set: { isConnected: true } },
           { multi: true })
          .exec(function(err){
              if (err){
                console.log(err, "postCreateEdgeController")
                return res.status(400).send(utils.errsForApi(err.errors || err));
              }

              Entity.find(
                { _id: {$in: [fromId, toId]}},
                'title _id faviconCDN canonicalLink description')
                .exec(function(err, entityResult){
                  if (err) return res.status(400).send(utils.errsForApi(err.errors || err));

                  res.send({
                    edgeId: resultEdge[0].Link.properties.id,
                    success: true,
                    entities: {
                      from: _.find(entityResult, { id: fromId}),
                      to: _.find(entityResult, { id: toId})
                    }
                  });
              });
          });
      }
  })
};
