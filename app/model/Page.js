const Sequelize = require('sequelize'),
      connection = require('./sequelize.js'),
      User = require('./User.js'),
      Connection = require('./Connection.js');

const attributes = {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  text: {
    type: Sequelize.TEXT,
    length: 'long'
  },
  title: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
  authorUrl: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  icon: { type: Sequelize.STRING },
  pageUrl: { type: Sequelize.STRING },
  siteName: { type: Sequelize.STRING },
  description: {
    type: Sequelize.TEXT,
    length: 'medium'
  },
  humanLanguage: { type: Sequelize.STRING },
  diffbotUri: { type: Sequelize.STRING },
  videos: { type: Sequelize.JSONB },
  authors: { type: Sequelize.JSONB },
  images: { type: Sequelize.JSONB },
  meta: { type: Sequelize.JSONB },
  wwUri: { type: Sequelize.STRING },
};

const options = {
  freezeTableName: true,
  instanceMethods: {
    toJSON: function () {
      var values = Object.assign({}, this.get());
      // Killing unneded values for our http response.
      delete values.html;
      delete values.text;
      delete values.meta;
      delete values.videos;
      delete values.images;
      return values;
    }
  },
  classMethods: {
    feed: function (limit, offset){
      return Page.findAll({
        limit: limit || 20,
        offset: offset || 0,
        include:[{ model: User }]
      });
    },
    search: function (searchString){
      const searchWordsArray = searchString.split(' ');
      const searchExpressionArray = searchWordsArray.map((item) => {
          return { $iLike: '%' + item + '%' };
      });
      return Page.findAll({
        where:{
          $or: [{
            title:{ $or:searchExpressionArray }
          },{
            description:{ $or:searchExpressionArray }
          }]
        }
      });
    },
    load: function (url){
      return Page.findOne({
        where:{
          pageUrl: {$iLike: '%' + url }
        },
        include:[{ model: User }]
      });
    },
    loadPage: function (pageUUID){
      return Page.findOne({
        where:{
          $or: [{ wwUri: pageUUID }]
        },
        include:[
          { model: User },
          { model: Connection }
        ]
      });
    }
  }
};

const Page = connection.define('pages', attributes, options);

Page.belongsTo(User);
Page.hasMany(Connection);

module.exports = Page;
