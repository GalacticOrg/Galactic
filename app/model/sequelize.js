const config  = require('../../config');

const Sequelize = require('sequelize'),
    sequelize = new Sequelize(
    config.DATABASE_URL,
    {
      logging: false
    });

module.exports = sequelize;
