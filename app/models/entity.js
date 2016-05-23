'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Article Schema
 */
const EntitySchema = new Schema({
  canonicalURL: {type : String, default : null},
});

/**
 * Validations
 */

EntitySchema.path('canonicalURL').required(true, 'Entity canonicalURL cannot be blank');

/**
 * Methods
 */

EntitySchema.methods = {


};

/**
 * Statics
 */

EntitySchema.statics = {

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

mongoose.model('Entity', EntitySchema);
