const Sequelize = require('sequelize'),
      connection = require('./sequelize.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
};

const options = {
  freezeTableName: true
}

const User = connection.define('users', attributes, options);
module.exports = User;
