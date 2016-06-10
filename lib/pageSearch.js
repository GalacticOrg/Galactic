'use strict';


const mongoose = require('mongoose')
const Entity = mongoose.model('Entity');
const async = require('async')
const extract = require('./extract')
const URLParse = extract.URLParse;
const copyAssets = extract.copyAssets;
const pageRequester = extract.pageRequester;
const Edge = require('../app/models/edge');

module.exports = function(q, cb){
  if (!q || typeof q !=='string'){ return cb({status:'Search must be string'}, null)}

  async.waterfall([
      function(cb){
        var url = URLParse(
          q.replace(/^\s+|\s+$/g,'') //trim off trailing
        );
        if (url){
           cb(null, url); //We pass URL as the first parameter in our waterfall
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
  ],cb)
}



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
    pageRequester(url, function(err, extractedPageData){
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
      extractedPageData = resultDBcanonicalLink?null:extractedPageData;//updating value if we foun a result in DB.  Pretend we never did the pageExtractor
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
 * @name   saveEntityToDB
 * @desc   Saves the db to the entity
 * @param  {object}      result
 * @param  {Function}    cb  a callback for the data.
 */
const saveEntityToDB = function(result, cb){
  var entity = new Entity(result);
  copyAssets(
    entity.image,
    entity.favicon,
    entity._id,
    function(err, results){
      entity.imageCDN = results[0];
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

/**
 * @name   Creates a connection
 * @desc   Saves the db to the entity
 * @param  {object}      result
 * @param  {Function}    cb  a callback for the data.
 */
const nodeCreator = function(url, resultDB, extractedPageData, cb){
  if (extractedPageData){
    Edge.createNode(
      resultDB._id,
      function (err, results) {
        cb(err, url, resultDB, extractedPageData);
    });
  } else{
    cb(null, url, resultDB, extractedPageData);
  }
}
