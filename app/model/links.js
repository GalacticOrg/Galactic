const Sequelize = require('sequelize'),
      connection = require('./sequelize.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
};

const options = {
  freezeTableName: true
};

const Links = connection.define('links', attributes, options);


module.exports = Links;
