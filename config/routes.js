'use strict';

/**
 * Module dependencies.
 */

const pages = require('../app/controllers/pages');
const users = require('../app/controllers/users');
const nodeCrud = require('../app/crudApi/nodeCrud');
const searchUrlCrud = require('../app/crudApi/searchUrlCrud');

const auth = require('./middlewares/authorization');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.param('id', nodeCrud.load);
  app.get('/api/node/:id', nodeCrud.getNodeController)

  app.get('/api/urlsearch', searchUrlCrud.getController)



  app.get('/', pages.home);
  app.get('/user', pages.user);
  app.get('/result', pages.result);
  app.get('/connect', pages.connect);
  app.get('/firehose', pages.firehose);

  /**
   * Error handling
   */
 // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
   passport.authenticate('local', {
     failureRedirect: '/login',
     failureFlash: 'Invalid email or password.'
   }), users.session);

   app.get('/auth/twitter',
     passport.authenticate('twitter', {
       failureRedirect: '/login'
     }), users.signin);

   app.get('/auth/twitter/callback',
     passport.authenticate('twitter', {
       failureRedirect: '/login'
     }), users.authCallback);

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
