'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = require('url');

/**
 * Entity Schema
 */
 const EntitySchema = new Schema({
   title: { type : String, default : '', trim : true },
   description: { type : String, default : '', trim : true },
   keywords: { type : Array, default : [] },
   html: [{ type : String }],
   text: [{ type : String }],
   links: [{
     name: { type:String },
     index: [{ type:Number }],
     paragraphIndex: { type:Number },
     href: { type:String }
   }],
   lang: { type : String, default : '', trim : true },
   createdAt  : { type : Date, default : Date.now },
   tags: { type : Array, default : [] },
   canonicalLink: { type : String, default : null },
   queryLink: { type : String, default : null },
   favicon: { type : String, default : null },
   faviconCDN: { type : String, default : null },
   isConnected: { type : Boolean, default : false },
   image: { type : String, default : '', trim : true },
   imageCDN: {
     url:{ type : String, default : null },
     dimensions:[{ type : Number, default:null }]
   },
   videos: { type : Array, default : null },
   hearts: [{
     createdAt: { type : Date, default : Date.now },
     user: { type : Schema.ObjectId, ref : 'User' }
    }]
 });

 /**
  * toJSON Options
  */
EntitySchema.set('toJSON', {
    virtuals: true // This is for our "domain" virtual
});

/**
 * Validations
 */

EntitySchema.path('canonicalLink').required(true, 'Entity canonicalLink cannot be blank');

/**
 * Methods
 */

EntitySchema.methods = {


};

/**
 * Virtual
 */
EntitySchema.virtual('domain').get(function () {
  return url.parse(this.canonicalLink).hostname
});

/**
 * Statics
 */

EntitySchema.statics = {

  /**
   * Find Entity by id [Required]
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id }, '_id title description createdAt canonicalLink queryLink faviconCDN isConnected image imageCDN hearts')
      .populate('user', 'name email username')
      .populate('comments.user', 'name email username')
      .exec(cb);
  },

  /**
   * List Entity
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    const criteria = options.criteria || {};
    const lean = options.lean || false;
    this.find(criteria, 'title description faviconCDN favicon canonicalLink')
      .populate('user', 'name username')
      .populate('comments.user')
      .sort({ 'createdAt': -1 }) // sort by date
      .limit(options.count)
      .skip(options.skip)
      .exec(cb);
  }
};

mongoose.model('Entity', EntitySchema);
