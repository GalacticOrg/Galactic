const User = require('../../app/model/user.js'),
      Page = require('../../app/model/page.js'),
      Links = require('../../app/model/links.js'),      
      Connection = require('../../app/model/connection.js'),
      Tag = require('../../app/model/tag.js').tag,
      ItemTag = require('../../app/model/tag.js').itemtag;


module.exports = function (callback) {
  // recreate User table
  User.sync().then(function (){
    Page.sync().then(function (){
      Connection.sync().then(function (){
        Tag.sync().then(function (){
          ItemTag.sync().then(function (){
              Links.sync().then(function (){
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
  }).catch(function (err){
    console.log(err);
    callback();
  });
};
