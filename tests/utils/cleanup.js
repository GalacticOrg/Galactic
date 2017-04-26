const User = require('../../app/model/User.js'),
      Page = require('../../app/model/Page.js');
      Connection = require('../../app/model/Connection.js'),
      Tag = require('../../app/model/Tag.js').tag;
      ItemTag = require('../../app/model/Tag.js').itemtag;


module.exports = function(callback) {
  // recreate User table
  User.sync().then(function (){
    Page.sync().then(function (){
      Connection.sync().then(function (){
        Tag.sync().then(function (){
          ItemTag.sync().then(function (){
            callback();
          }).catch(function (err){
            console.log(err);
            callback();
          });
        }).catch(function (err){
          console.log(err);
          callback();
        });
      }).catch(function (err){
        console.log(err);
        callback();
      });
    }).catch(function (err){
      console.log(err);
      callback();
    });
  }).catch(function (err){
    console.log(err);
    callback();
  });
}
