const Sequelize = require('sequelize'),
      connection = require('./sequelize.js'),
      Page = require('./Page.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  name: { type: Sequelize.STRING }
};

const options = {
  freezeTableName: true
};

const ItemTags = connection.define('itemtag', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  }
});

const Tags = connection.define('tags', attributes, options);

Page.belongsToMany(Tags, { as: 'tags', through: ItemTags });


module.exports.tags = Tags;
module.exports.itemtags = ItemTags;
