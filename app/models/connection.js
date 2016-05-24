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
	console.log(params)

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
  'MATCH (PageOne:page {id:{_idOne}})',
  'MATCH (PageTwo:page {id:{_idTwo}})',
  'CREATE PageOne-[Link:userEdge {id:{_id}, userId:{_userId} } ]->PageTwo',
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
  'CREATE (Page:page {id:{_id}})',
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

      cb(err, results);
			// _.chain(results)
		  // 	 .filter(function(r, i){return r.Link._fromId === r.PageOne._id})
		  // 	 .map(function(r){return srefParser(r)})
		  // 	 .value(),
			// _.chain(results)
		  // 	 .filter(function(r, i){return r.Link._toId === r.PageOne._id})
		  // 	 .map(function(r){return inboundSrefParser(r)})
		  // 	 .value()
      //  )
	  });
};

//get Node Query
const getNodeQ = [
  'MATCH (PageOne:page {id:{_id}})-[Link]-(PageTwo)',
  'RETURN PageOne, Link, PageTwo'].join('\n');

/**
 * @name   srefParser
 * @r     {obj} Neo4j object
 * @return {obj}    cb  a callback for the data.
 */
// const srefParser = function(r){
//   const pageID = r.PageTwo.properties._id; //Get the other articles uid
//   const link = r.Link.properties; //Get the link properties
//   const textIndex = link.textIndexFrom;//Get the text index
//   const paragraphIndex = link.pIndexFrom; //Get the p index
//   return {
//     _id: link._id,
//     index: textIndex,
//     paragraphIndex: paragraphIndex,
//     sref: pageID,
//   }
// }

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
 * load a multiple nodes from a MongoId;
 */
// exports.getNodes = function(ids, cb){
//
//
// 	const getMultipleNodesQ = ['MATCH (pageOne)-[Link]->(pageTwo)',
// 		'WHERE pageOne._id IN {_id}',
// 		'RETURN pageOne, pageTwo, Link'].join('\n');
//
// 	// getMultipleNodesQ.push(returnString)
// 	// getMultipleNodesQ = getMultipleNodesQ.join('\n');
//
//
// 	db.cypher({
// 	      query: getMultipleNodesQ,
// 	      params: {
// 	      	_id:ids
// 	      },
// 	  },
// 	  function(err, results){
//
// 	  	if (err) {
// 	  	  console.log(err)
// 	  		return cb(err, null)
// 	  	}
//
//       cb(err,
// 		  	_.map(ids, function(id){
// 		  		return _.chain(results)
// 		  		.filter(function(r){
// 		  			return id == r.pageOne.properties._id ||
// 		  			 id == r.pageTwo.properties._id
// 		  		})
// 		  		.map(function(r){
// 		  			return resultsParser(r, id)
// 		  		})
// 		  		.uniq()
// 		  		.value()
// 		  	})
//        )
// 	  });
// };


/**
 * @name   srefParser
 * @r     {obj} Neo4j object
 * @return {obj}    cb  a callback for the data.
 */
// const resultsParser = function(r, id){
// 	const pageID = r.pageOne.properties._id != id ? r.pageOne.properties._id :r.pageTwo.properties._id;
//   return pageID
// }
