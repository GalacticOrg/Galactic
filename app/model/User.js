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
  bio: {
    type: Sequelize.STRING
  },
  avatar: {
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
  freezeTableName: true,
  toJSON: function () {
    var values = Object.assign({}, this.get());
    // Killing unneded values for our http response.
    delete values.email;
    delete values.password;
    delete values.salt;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  }
}

const User = connection.define('users', attributes, options);
module.exports = User;
