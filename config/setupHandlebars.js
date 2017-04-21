var ehandlebars = require('express-handlebars');

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
      }
    }
  });
  
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
};
