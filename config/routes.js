'use strict';

/**
 * Module dependencies.
 */

const pages = require('../app/controllers/pages');
const users = require('../app/controllers/users');
const edgeCrud = require('../app/crudApi/edgeCrud');
const entityCrud = require('../app/crudApi/entityCrud');
const userCrud = require('../app/crudApi/userCrud');
const auth = require('./middlewares/authorization');
const config = require('./');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/download', function(req, res){res.redirect( config.chromeWebStoreLocation )});
  // Static Routes App
  app.param('id', pages.load);
  app.get('/', pages.home);
  app.get('/@:user', pages.user);
  app.get('/node/:id', pages.node);
  app.get('/connect', pages.connect);
  app.get('/firehose', pages.firehose);

  // Static Routes for pages
  app.get('/analytics', pages.analytics);
  app.get('/about', pages.about);
  app.get('/faq', pages.faq);
  app.get('/terms', pages.terms);
  app.get('/privacy', pages.privacy);
  app.get('/fivehundred', pages.fivehundred);

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

   // Everything Below is CORS enabled for our X-site extension
   app.use(function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
     next();
   });

   // API Entity
   app.param('idApi', entityCrud.load);
   app.get('/api/searchurl', entityCrud.getSearchController);
   app.post('/api/node/:idApi/heart', auth.requiresLogin, entityCrud.postHeartController);
   app.get('/api/node/:idApi', entityCrud.getEntityController);

   // API Edge
   app.param('user', edgeCrud.loadUser);
   app.get('/api/edges/users/:user', edgeCrud.getUserEdgeController);
   app.get('/api/edges/firehose', edgeCrud.getEdgeController);

   app.param('eid', edgeCrud.loadEdgeId);

   app.post('/api/connect', edgeCrud.postCreateEdgeController);
   app.options('/api/connect', auth.requiresLogin, edgeCrud.postCreateEdgeController);

   app.post('/api/connect/:eid', auth.requiresLogin, edgeCrud.postTagsEdgeController);

   // API User
   const userPath = '/api/users';
   const profilePath = userPath + '/profile';
   app.get(profilePath, userCrud.getReadControllerProfile);

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error('ERROR: Message', err.message, 'Stack Trace', err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });

};
