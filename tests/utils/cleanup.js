const User = require('../../app/model/User.js'),
      Page = require('../../app/model/Page.js');
      Connection = require('../../app/model/Connection.js');


module.exports = function(callback) {
  // recreate User table
  User.sync().then(function (){
    Page.sync().then(function (){
      Connection.sync().then(function (){
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
}
