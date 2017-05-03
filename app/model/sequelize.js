const config  = require('../../config');
console.log(config.DATABASE_URL, 'configconfig');

const Sequelize = require('sequelize'),
    sequelize = new Sequelize(
    config.DATABASE_URL,
    {
      logging: false
    });

module.exports = sequelize;
