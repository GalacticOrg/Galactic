const Sequelize = require('sequelize'),
      connection = require('./sequelize.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  label: { type: Sequelize.STRING },
  uri: { type: Sequelize.STRING, unique: true }
};

const options = {
  freezeTableName: true
};

// const ItemTag = connection.define('itemtag', {
//   id: {
//     type: Sequelize.UUID,
//     primaryKey: true,
//     defaultValue: Sequelize.UUIDV4
//   }
// });

const attributesItem = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  score: { type: Sequelize.FLOAT },
  count: { type: Sequelize.INTEGER }
};

const optionsItem = {
  freezeTableName: true
};

const ItemTag = connection.define('itemtag', attributesItem, optionsItem);

const Tag = connection.define('tag', attributes, options);

module.exports.tag = Tag;
module.exports.itemtag = ItemTag;
