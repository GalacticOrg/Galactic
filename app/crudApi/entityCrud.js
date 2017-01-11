'use strict';
/**
 * Copyright (c) 2016, WikiWeb
*/
const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const Edge = require('../models/edge');
const utils = require('../../lib/utils')
const User = mongoose.model('User');
const _ = require('lodash');
const pageSearch = require('../../lib/pageSearch')

/**
 * loadApi
 */
exports.load = function (req, res, next, id){
  Entity.load(id, function (err, entity) {
    if (!entity || (err && err.message==='Cast to ObjectId failed')) return  res.status(404).send(utils.errsForApi('Page not found'));
    if (err) return  res.status(500).send( utils.errsForApi(err.errors || err) );
    req.entity = entity;
    Edge.getNearByNodeEdges(entity._id, function(errNear, nearByEdges){
      if (errNear) return  res.status(500).send( utils.errsForApi(errNear.errors || errNear) );
      req.nearByEdges = nearByEdges;

      Edge.getNode(entity._id, function(errNodeEdge, edges){
        if (errNodeEdge) return  res.status(500).send( utils.errsForApi(errNodeEdge.errors || errNodeEdge) );
        req.edges = edges
        next();
      })
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
    .map(function (edgesGrouped ){
        const edgeSorted = _.sortBy(edgesGrouped,'createdAt');
        return {
          _idNode: edgeSorted[0]._idNode,
          _idLink: edgeSorted[0]._idLink,
          createdAt: edgeSorted[0].createdAt,
          edges:edgeSorted
        };
    }).value();
  const nearByEdges = req.nearByEdges;
  const entityIds = _.map(req.edges, '_idNode');
  const userIds = _.map(req.edges, '_idUser');
  const entityIdsRelated = _.chain(nearByEdges)
    .map('nodes')
    .flatten()
    .map('_id')
    .value();
  const userIdsRelated = _.chain(nearByEdges)
    .map('edges')
    .flatten()
    .map('properties.userId')
    .reject(_.isUndefined)
    .value();

  if (!entity) {
    res.status(404).send(utils.errsForApi('Node not found!!'));
  } else {
    const object = entity.toJSON();

    Edge.getNodeCount(entityIds.concat(entity.id).concat(entityIdsRelated), function (err, entityCount){
      if (err) return  res.status(500).send( utils.errsForApi(err.errors || err) );

      Entity.find(
        { _id: {$in:  entityIds.concat(entityIdsRelated) }},
        '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN')
      .exec(function(err, entities){

        User.find(
          { _id: {$in: userIds.concat(userIdsRelated) }},
          'name username twitter'
        )
        .exec(function(err, users){
          object.entityCount =  entityCount[entity.id]?entityCount[entity.id].length:0;
          object.nearByEdges = nearByEdges.map(function(near){
            const nodes = near.nodes.map(function(node){
              const _id = node._id;
              return  {
                node: _.find(entities, { id: _id}),
                entityCount: entityCount[_id]?entityCount[_id].length:0
              }
            });

            const edges = near.edges.map(function(edge){
              const userId = edge.properties.userId
              if (userId!=undefined){
                edge.properties.userId = _.find(users, { id: userId})
              }
              return edge;
            })
            return {
              nodes,
              edges
            }
          });

          object.superEdges = edges.map(function(edge, i){
            return {
              entity: _.find(entities, { id: edge._idNode}),
              entityCount: entityCount[edge._idNode].length,
              createdAt: edge.createdAt,
              edges: edge.edges.map(function (e){
                return {
                  user:_.find(users, { id: e._idUser }),
                  createdAt: e.createdAt,
                  _id: e._idLink,
                  tags: e.tags ? e.tags : []
                };
              })
            };
          });
          res.send(object);
        });
      });// Entity.find
    });// Edge.getNodeCount
  }
};

/**
 * Search API for Node and Scrape Page
 */
exports.getSearchController = function (req, res) {
  const q = req.query.q
  const user = req.user
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
        console.log(err, 'getSearchController err')
        res.status(status).json(err);
      } else {
        //Here is where we push all links to our child scrapper.
        addToScrapperQ(_.map(resultDB.links, function(link){
          return {
            href: link.href,
            fromId: resultDB.id
          }
        }))
        const payload = {
           node : resultDB.toObject(),
           isURL: true
        };
        res.send(payload);
      }
  })
};

function scraperRecursive(){
  const edgeType = 'siteEdge';
  running = true;

  const link = Q.pop()
  if (link===undefined || !link.href){// no link stop attempt for page search
    if (Q.length==0) { //Q was empty we can not continue;
      running = false
    } else {
      scraperRecursive()
    }

    return false; //Do not run the page search
  }

  pageSearch(link.href, function(err, url, resultDB, extractedPageData){
    if (!err && resultDB){
      const fromId = link.fromId
      const toId = resultDB.id
      Edge.getEdgesForPath(
        fromId,
        toId,
        function(err, resultExisting){
          if (resultExisting && resultExisting.length==0){
            Edge.createSiteEdge(
              fromId,
              toId,
              function(err, resultEdge){
                if (err) console.log(err, 'scraperRecursive getEdgesForPath')
            })
          }

        });

    } else{
      //No Opp
    }

    if (Q.length==0){
      running = false; //Stop the recursive call and set running to false
    } else {
      scraperRecursive()
    }
  });

}

function addToScrapperQ(hrefs){
  Q = Q.concat(_.uniq(hrefs))
  //console.log(Q.length,'Q is now this')
  if (running==false){
    scraperRecursive();
  }
}

let Q =[];
let running = false;
