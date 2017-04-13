const pgdb = process.env.pgdb || 'postgres://postgres:postgres@localhost:5432/wikiweb'

const Sequelize = require('sequelize'),
    sequelize = new Sequelize(
    pgdb,
    {
      logging: false
    });

module.exports = sequelize;
