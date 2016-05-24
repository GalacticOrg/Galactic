'use strict';
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');

exports.load = function (req, res, next, id){
  req.id = id;
  next();
};

/**
 * Create Connection
 */
exports.getCreateConnectionController = function (req, res) {

  const body = req.body;
  const idFrom = body.idFrom;
  const idTo = body.idTo;
  const id  = req.user.id

  Connection.createSREF(
    idFrom,
    idTo,
    userId,
    function(err, result){
      if (!err) {
        // const parsedSREF = srefParser(result[0]);
        //
        // var object = article.toJSON();
        // object.sref = sref;
        //
        // object.sref.push(parsedSREF);
        res.send(result);
      } else {
        res.status(400).send(utils.errsForApi(err.errors || err));
      }
  })
};
