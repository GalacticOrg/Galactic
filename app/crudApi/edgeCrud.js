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
      if (err) {
        console.log(err, "getUserEdges")
        return res.status(500).send(utils.errsForApi(err.errors || err));
      }
      req.userEdges=edges;
      next();
    })

  });
};

/**
 * * Get User Edges API
 */
 exports.getUserEdgeController = function (req, res) {
   const edges = req.userEdges;
   const entityIds = _.map(edges, '_idNodeFrom').concat(_.map(edges, '_idNodeTo'))
   const profile = req.profile;
   Entity.find(
       { _id: {$in: entityIds }},
       '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
     .exec(function(err, entities){

       if (err) {
         console.log(err, "Entity Find")
         return res.status(500).send(utils.errsForApi(err.errors || err));
       }

       const result = edges.map(function(edge, i){
         return {
           nodeFrom :  _.find(entities, { id: edge._idNodeFrom}),
           nodeTo : _.find(entities, { id: edge._idNodeTo}),
           createdAt: edge.createdAt
         }
       })

       res.send({
         result,
         profile
       })
     });
 }

 /**
  * * Get Edges API
  */
 exports.getEdgeController = function (req, res) {
  Edge.getEdges(35, function(err, edges){
    const entityIds = _.map(edges, '_idNodeFrom').concat(_.map(edges, '_idNodeTo'))
    const userIds = _.map(edges, '_idUser')
    Entity.find(
      { _id: {$in: entityIds }},
      '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
        .exec(function(err, entities){
          User.find({ _id: {$in: userIds }}, 'name username twitter')
            .exec(function(err, users){
              const object = edges.map(function(edge, i){
                return {
                  nodeFrom :  _.find(entities, { id: edge._idNodeFrom}),
                  nodeTo : _.find(entities, { id: edge._idNodeTo}),
                  user:  _.find(users, { id: edge._idUser}),
                  createdAt: edge.createdAt
                }
              })
              res.send(object)
            })
    });
  })
}

const blob = require('./nested.json');
exports.getEdgeControllerNest = function(req, res){
  res.send(blob)
}


/**
 * * Create Edges API
 */
exports.postCreateEdgeController = function (req, res) {
  const body = req.body;
  const toId = body.toId;
  const fromId = body.fromId;
  const userId = req.user.id



  Edge.getEdgesForPath(
    fromId,
    toId,
    userId,
    function(err, resultExisting){
      if (resultExisting && resultExisting.length>0){
        res.status(409).send({
          success: false,
          errors: ['You have already made that connection']
        });
      } else {
        Edge.createEdge(
          fromId,
          toId,
          userId,
          function(err, resultEdge){
            if (err) {
              console.log(err, "postCreateEdgeController")
              return res.status(500).send(utils.errsForApi(err.errors || err));
            } else if(resultEdge.length==0){
              console.log(resultEdge, "postCreateEdgeController No Edge")
              return res.status(500).send(utils.errsForApi('No Edge Created'));
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
        })//Edge.createEdge end
      } //END if else
  })//Edge.getEdgesForPath e

};

/**
 * * Post Tags Edges API
 */
exports.postTagsEdgeController = function (req, res) {
  const tags = req.body.tags
  res.send({tags, success:true})
}
