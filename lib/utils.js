'use strict';
/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */
var errors = function (errors) {
  if (typeof errors === 'string') return [errors];
  if (typeof errors.message === 'string') return [{
      text: errors.message,
      type: 'error'
    }];

  errors = errors || {};
  const keys = Object.keys(errors);
  const errs = [];

  // if there is no validation error, just display a generic error
  if (!keys) {
    errs.push({
      text: 'Oops! There was an error',
      type: 'error'
    });
    return errs;
  }

  keys.forEach(key => {
    if (errors[key]) errs.push({
      text:errors[key].message,
      type: 'error'
    });
  });

  return errs;
};
exports.errors = errors;

/**
 * Formats mongoose errors into response for API
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errsForApi = function (err) {
  return {
    success: false,
    errors: errors(err)
  }
};
