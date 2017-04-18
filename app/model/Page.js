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
  humanLanguage: { type: Sequelize.STRING },
  diffbotUri: { type: Sequelize.STRING },
  videos: { type: Sequelize.JSONB },
  authors: { type: Sequelize.JSONB },
  images: { type: Sequelize.JSONB }
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
        pageUrl: data.pageUrl,
        siteName: data.siteName,
        humanLanguage: data.humanLanguage,
        diffbotUri: data.diffbotUri,
        videos: data.videos,
        authors: data.authors,
        images: data.images,
        userId: user.id
      });
    }
  }
};

const Page = connection.define('pages', attributes, options);

Page.belongsTo(User);
Page.hasMany(Connection);

module.exports = Page;
