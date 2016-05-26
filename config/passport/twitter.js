'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../../config');
const User = mongoose.model('User');
const extract = require('../../lib/extract');


/**
 * Expose
 */

module.exports = new TwitterStrategy({
    consumerKey: config.twitter.clientID,
    consumerSecret: config.twitter.clientSecret,
    callbackURL: config.twitter.callbackURL,
    includeEmail: true
  },
  function (accessToken, refreshToken, profile, done) {
    const options = {
      criteria: { "twitter_id": profile.id }
    };
    User.load(options, function (err, user) {
      if (err) return done(err);


      if (!user) {
        let user = new User({
          name: profile.displayName,
          username: profile.username,
          email: profile.email,
          provider: 'twitter',
          twitter_id: profile.id,
          twitter: profile._json
        });
        //pulling profile images
        // if (user.twitter && user.twitter.profile_image_url){
        //   const uID = user._id;
        //   const defaultImageURL = user.twitter.profile_image_url;
        //   const defaultImageUID =  'profile_images/default_'+ uID;
        //   extract.upload(defaultImageURL, defaultImageUID, function(err, url, dimensions){
        //     if (err) return console.log(err, 'TwitterStrategy Auth');
        //     user.profile_image = url;
        //     user.save();
        //   });
        //   const largeImageURL = user.twitter.profile_image_url.replace('_normal.jpg', '.jpg');
        //   const largeImageUID =  'profile_images/large_'+ uID;
        //   extract.upload(largeImageURL, largeImageUID, function(err, url, dimensions){
        //     if (err) return console.log(err, 'TwitterStrategy Auth');
        //     user.profile_image_large = url;
        //     user.save();
        //   });
        // }

        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    })
  }
);
