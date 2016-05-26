'use strict';

/**
 * Module dependencies.
 */

const config = require('../../config');
const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase(config.neo4jdb);
const _ = require('lodash');


const mongoose = require('mongoose');
mongoose.model('Connection', {});
const Connection = mongoose.model('Connection');

/**
 * Create anSREF from two existing nodes;
 */
exports.createEdge = function(_idOne, _idTwo, _userId, cb){
	const _id = new Connection({})._id;
	let params = {
			_idOne,
			_idTwo,
			_createdAt : new Date().getTime(),
			_id,
			_userId
	}
  console.log("creating Edge")
	db.cypher(
		{
			params: params,
			query: createSREFQ
		},
	cb
	);
};
//createSREF Query
const createSREFQ = [
  'MATCH (PageOne {id:{_idOne}})',
  'MATCH (PageTwo {id:{_idTwo}})',
  'CREATE (PageOne)-[Link:userEdge {id:{_id}, userId:{_userId}, createdAt:{_createdAt} } ]-> (PageTwo)',
  'RETURN PageOne, Link, PageTwo'].join('\n');


/**
 * Create a node from a MongoId;
 */
exports.createNode = function(_id, cb){
	db.cypher({
	      query: createNodeQ,
	      params: {
	          _id
	      },
	  },
	  cb);
};
//createNode Query
const createNodeQ = [
  'CREATE (Page {id:{_id}})',
  'RETURN Page'].join('\n');


/**
 * load a node from a MongoId;
 */
exports.getNode = function(_id, cb){
	db.cypher({
	      query: getNodeQ,
	      params: {
	          _id
	      },
	  }, function(err, results){

		if (err) {
		  console.log(err, 'getNode')
			return cb(err, null)
		}

	  cb(err,
			results.map(function(r){return getNodeParser(r)})
		);
	});
};

//get Node Query
const getNodeQ = [
  'MATCH ({id:{_id}})-[edge:userEdge]-(nodeTo)',
  'RETURN edge, nodeTo'].join('\n');

/**
 * @name   srefParser
 * @r     {obj} Neo4j object
 * @return {obj}    cb  a callback for the data.
 */
const getNodeParser = function(r){
  const _idNode = r.nodeTo.properties.id; //Get the other articles uid
  const _idLink = r.edge.properties.id; //Get the link properties
	const _idUser = r.edge.properties.userId; //Get the link properties
	const createdAt = r.edge.properties.createdAt; //Get the link properties

  return {
  	_idLink,
		_idNode,
		_idUser,
		createdAt
  }
}

/**
 * @name   inboundSrefParser
 * @r     {obj} Neo4j object
 * @return {obj}    cb  a callback for the data.
 */
// const inboundSrefParser = function(r){
//   const pageID = r.PageTwo.properties._id; //Get the other articles uid
//   const link = r.Link.properties; //Get the link properties
//   const textIndex = link.textIndexTo;//Get the text index
//   const paragraphIndex = link.pIndexTo; //Get the p index
//   return {
//     _id: link._id,
//     index: textIndex,
//     paragraphIndex: paragraphIndex,
//     sref: pageID,
//   }
// }

  // const textIndex = outBound?link.textIndexFrom:link.textIndexTo; //Get the text index
  // const paragraphIndex = outBound?link.pIndexFrom:link.pIndexTo; //Get the p index




/**
 * load a list of edges by User
 */
exports.getUserEdges = function(_id, cb){

	db.cypher({
	      query: getUserEdgesQ,
	      params: {
	      	_id
	      },
	  },
	  function(err, results){

	  	if (err) {
	  	  console.log(err, 'getUserEdges')
	  		return cb(err, null)
	  	}

      cb(err, results.map(function(r){return getEdgeParser(r)})
       )
	  });
};
const getUserEdgesQ = ['MATCH (nodeFrom)-[edge]->(nodeTo)',
	'WHERE edge.userId IN {_id}',
	'RETURN nodeFrom, edge, nodeTo'].join('\n');

/**
 * @name   srefParser
 * @r     {obj} Neo4j object
 * @return {obj}    cb  a callback for the data.
 */
const getEdgeParser = function(r){
  const _idNodeFrom = r.nodeFrom.properties.id; //Get the other articles uid
	const _idNodeTo = r.nodeTo.properties.id; //Get the other articles uid
  const _idLink = r.edge.properties.id; //Get the link uid
	const createdAt = r.edge.properties.createdAt; //Get the link properties

  return {
  	_idNodeFrom,
		_idNodeTo,
		_idLink,
		createdAt
  }
}

/**
 * load a list of edges
 */
exports.getEdges = function(_limit, cb){

	db.cypher({
	      query: getEdgesQ,
	      params: {
	      	_limit
	      },
	  },
	  function(err, results){

	  	if (err) {
	  	  console.log(err, 'getUserEdges')
	  		return cb(err, null)
	  	}

      cb(err,
				results.map(function(r){return getEdgeParser(r)})
       )
	  });
};
const getEdgesQ = ['MATCH (nodeFrom)-[edge]->(nodeTo)',
	'RETURN nodeFrom, edge, nodeTo',
	'ORDER BY edge.createdAt',
	'LIMIT {_limit}'].join('\n');

/**
 * @name   srefParser
 * @r     {obj} Neo4j object
 * @return {obj}    cb  a callback for the data.
 */
// const resultsParser = function(r, id){
// 	const pageID = r.pageOne.properties._id != id ? r.pageOne.properties._id :r.pageTwo.properties._id;
//   return pageID
// }
