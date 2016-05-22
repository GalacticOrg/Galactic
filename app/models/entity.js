'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Article Schema
 */
const ArticleSchema = new Schema({
  canonicalLink: {type : String, default : null},
  queryLink: {type : String, default : null},
});

/**
 * Validations
 */

// ArticleSchema.path('title').required(true, 'Article title cannot be blank');
// ArticleSchema.path('text').required(true, 'Article text cannot be blank');

/**
 * Methods
 */

ArticleSchema.methods = {


};

/**
 * Statics
 */

ArticleSchema.statics = {

  /**
   * Find article by id [Required]
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email username')
      .populate('comments.user', 'name email username')
      .exec(cb);
  },

  /**
   * List articles
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
      .sort({'createdAt': -1}) // sort by date
      .limit(options.count)
      .skip(options.skip)
      .exec(cb);
  }
};

mongoose.model('Entity', ArticleSchema);
