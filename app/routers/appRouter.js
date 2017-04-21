const signupController = require('../controllers/signupController.js'),
      appController = require('../controllers/appController.js');

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/');
  };

  var isNotAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated())
      return next();
    res.redirect('/');
  };

  router.get('/signup', isNotAuthenticated, signupController.show);
  router.post('/signup', signupController.signup);

  router.post('/login', signupController.authenticate);

  router.get('/login', isNotAuthenticated, signupController.login);

  router.get('/', appController.main);


  router.get('/search', appController.search);
  router.param('wwid', appController.loadwwid);
  router.get('/page/:wwid', appController.page);

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/*', function (req, res) {
    res.status(404).render('404');
  });

  return router;
};
