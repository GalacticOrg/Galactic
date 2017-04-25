const User = require('../../app/model/User.js'),
      Page = require('../../app/model/Page.js');
      Connection = require('../../app/model/Connection.js'),
      Tags = require('../../app/model/Tags.js').tags;
      ItemTag = require('../../app/model/Tags.js').itemtags;


module.exports = function(callback) {
  // recreate User table
  User.sync().then(function (){
    Page.sync().then(function (){
      Connection.sync().then(function (){
        Tags.sync().then(function (){
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
