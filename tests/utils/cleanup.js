var Model = require('../../app/model/models.js')

module.exports = function(callback) {
  // recreate User table
  Model.User.sync({ force: true }).then(function() {

  })
}
