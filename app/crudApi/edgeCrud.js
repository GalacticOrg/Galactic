'use strict';
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const Edge = require('../models/connection');
const utils = require('../../lib/utils')

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
      console.log(resultEdge, "resultEdge")
      console.log(err, "error")
      if (!err) {
        Entity.update(
           { _id: {$in: [fromId, toId]}},
           { $set: { isConnected: true } },
           { multi: true })
          .exec(function(err, result){
              if (err){
                res.status(400).send(utils.errsForApi(err.errors || err));
              }
              res.send({
                _id: resultEdge._id,
                success: true
              });
          });

      } else {
        res.status(400).send(utils.errsForApi(err.errors || err));
      }
  })
};
