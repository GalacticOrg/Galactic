'use strict';
/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

const SLACK_WH_NEW_USER = process.env.SLACK_WH_NEW_USER;
const SLACK_WH_USER_ENGAGEMENT = process.env.SLACK_WH_USER_ENGAGEMENT;

const Slack = require('node-slack');
const slackWHNewUser = new Slack(SLACK_WH_NEW_USER);
const slackWHUserEngagment = new Slack(SLACK_WH_USER_ENGAGEMENT);
const env = process.env.NODE_ENV || 'development';

exports.logNewUserInSlack = function (username){
  if (env !== 'production' || [username].indexOf(undefined) !== -1) {return false;}
  slackWHNewUser.send({
    text: '@' + username + ' just joined the wikiweb: https://twitter.com/' + username,
    unfurl_links: true,
  });
};

exports.slackNewHeart = function (username, url, title){
  if (env !== 'production' || [username, url, title].indexOf(undefined) !== -1) {return false;}
  slackWHUserEngagment.send({
    text: '@' + username +' <3 ' + title + ': ' + url,
    unfurl_links: true,
  });
};

exports.slackNewConnection = function (username, fromUrl, toURL){
  if (env !== 'production' || [username, fromUrl, toURL].indexOf(undefined) !== -1) {return false;}
  slackWHUserEngagment.send({
    text: '@' + username + ' connected ' + fromUrl + ' to ' + toURL,
    unfurl_links: true,
  });
};

var errors = function (errors) {
  if (typeof errors === 'string') return [{
      text: errors,
      type: 'error'
  }];
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
  };
};
