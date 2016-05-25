'use strict';
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const Edge = require('../models/connection');
const utils = require('../../lib/utils')
const _ = require('lodash');

exports.load = function (req, res, next, id){
  req.id = id;
  next();
};

/**
 * Create Connection
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
