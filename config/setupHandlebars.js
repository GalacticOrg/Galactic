const ehandlebars = require('express-handlebars'),
      moment = require('moment');

module.exports = function (app) {
  var hbs = ehandlebars.create({
    defaultLayout: 'app.handlebars',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
      toJSON: function(obj) {
        return JSON.stringify(obj, null, 3);
      },
      isLength: function(obj, len) {
        return obj === len;
      },
      greaterThan: function(obj, len) {
        return obj > len;
      },
      doesEqual: function(a, b) {
        return a === b;
      },
      rawHelper: function(obj){
         return obj.fn();
      },
      timeAgo: function(time){
         return moment(time).startOf('hour').fromNow();       // a few seconds ago
      },
      getTime: function(){
         return new Date().getTime();
      },
      avatarNotNull: function(url){
         return url === null ? '/static/img/default_avatar.png': url;
      }
    }
  });

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
};
