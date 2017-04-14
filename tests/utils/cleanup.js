var Model = require('../../app/model/models.js')

module.exports = function(callback) {
  // recreate User table
  Model.User.sync({ force: true }).then(function(result) {
    console.log('Success')
    callback();
  }).catch(function(err){
    console.log(err, 'err')
    callback();
  })
}
