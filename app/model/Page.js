const Sequelize = require('sequelize'),
    connection = require('./sequelize.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  user: {
    type: Sequelize.UUID,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  favicon: {
    type: Sequelize.STRING
  }
};

const options = {
  freezeTableName: true
};

const Page = connection.define('pages', attributes, options);
module.exports = Page;
