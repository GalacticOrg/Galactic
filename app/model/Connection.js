const Sequelize = require('sequelize'),
      connection = require('./sequelize.js'),
      User = require('./User.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
};

const options = {
  freezeTableName: true,
  classMethods: {
    feed: function (limit, offset){
      return Connection.findAll({
        limit: limit || 20,
        offset: offset || 0,
        include:[{ model: User, as: 'user' }, { model: User, as: 'user' }],
        order: [
          ['updatedAt', 'DESC']
        ]
      });
    }
  }
};

const Connection = connection.define('connection', attributes, options);

Connection.belongsTo(User, { as: 'user' });

module.exports = Connection;
