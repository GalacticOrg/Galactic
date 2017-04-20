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
  html: {
    type: Sequelize.TEXT,
    length: 'medium'
  },
  text: { type: Sequelize.TEXT, length: 'medium' },
  title: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
  authorUrl: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  icon: { type: Sequelize.STRING },
  pageUrl: { type: Sequelize.STRING },
  siteName: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  humanLanguage: { type: Sequelize.STRING },
  diffbotUri: { type: Sequelize.STRING },
  videos: { type: Sequelize.JSONB },
  authors: { type: Sequelize.JSONB },
  images: { type: Sequelize.JSONB },
  meta: { type: Sequelize.JSONB },
};

const options = {
  freezeTableName: true,
  classMethods: {
    saveDiffBotResult: function (data, user){
      return Page.create({
        html: data.html,
        text: data.html,
        title: data.title,
        author: data.author,
        authorUrl: data.authorUrl,
        type: data.type,
        icon: data.icon,
        pageUrl: data.resolvedPageUrl || data.pageUrl,
        siteName: data.siteName,
        humanLanguage: data.humanLanguage,
        diffbotUri: data.diffbotUri,
        videos: data.videos,
        authors: data.authors,
        images: data.images,
        userId: user ? user.id : null,
        meta: data.meta,
        description:  data.meta.description
      });
    },
    search: function (searchString){
      const searchWordsArray = searchString.split(' ');
      const searchExpressionArray = searchWordsArray.map((item) => {
          return { $iLike: '%' + item + '%' };
      });
      return Page.findAll({
        where:{
          title:{ $or:searchExpressionArray }
        }
      });
    },
    load: function (url){
      return Page.findOne({
        where:{
          pageUrl:url
        },
        include:[{ model: User }]
      });
    },
    loadPage: function (pageUUID){
      const urlHttps = 'https://' + pageUUID;
      const urlHttp = 'http://' + pageUUID;
      return Page.findOne({
        where:{
          $or: [{ pageUrl: urlHttp }, { pageUrl: urlHttps }]
        },
        include:[{ model: User }]
      });
    },
    load: function (url){
      // 1 Full url
      // 2 Without protocol
      // 3 withtout params
      //
      return Page.findOne({
        pageUrl:url
      });
    }
  }
};

const Page = connection.define('pages', attributes, options);

Page.belongsTo(User);
Page.hasMany(Connection);

module.exports = Page;
