const Sequelize = require('sequelize'),
      connection = require('./sequelize.js'),
      User = require('./User.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
};

const options = {
  freezeTableName: true
};

const Connection = connection.define('connection', attributes, options);

Connection.belongsTo(User, {as: 'user'});

module.exports = Connection;
