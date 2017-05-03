const Sequelize = require('sequelize'),
      connection = require('./sequelize.js'),
      User = require('./user.js'),
      Tag = require('./tag.js').tag,
      ItemTag = require('./tag.js').itemtag,
      Connection = require('./connection.js'),
      userAttibutrs = ['username', 'displayName', 'id', 'avatar'];

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
  lastActivityAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  isConnected: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
  wwUri: { type: Sequelize.STRING }
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
      //  Manual Join Q for refrence
      //  return connection.query('SELECT * FROM pages INNER JOIN connection ON "connectionPage" = pages.id INNER JOIN users ON connection."userId" = users.id;')
      return Page.findOne({
        where:{
          pageUrl: { $iLike: '%' + url }
        },
        include:[{ model: User, attibutrs:userAttibutrs }]
      });
    },
    loadPage: function (pageUUID){
      return Page.findOne({
        where:{
          $or: [{ wwUri: pageUUID }]
        }
      });
    }
  }
};

const Page = connection.define('pages', attributes, options);

Page.belongsTo(User);
Page.belongsToMany(Page, { as: 'connections', foreignKey : 'connectionPage', otherKey:'destinationPage', through: Connection });
Page.belongsToMany(Tag, { as: 'tag', through: ItemTag });
module.exports = Page;
