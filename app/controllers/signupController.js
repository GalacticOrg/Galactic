var bcrypt = require('bcrypt'),
    User = require('../model/user.js'),
    passport = require('passport'),
    assets = require('../../utils/assets');

module.exports.show = function (req, res) {
  res.render('signup');
};

module.exports.login  = function (req, res) {
 res.render('login');
};

module.exports.signup = function (req, res) {
  const username = req.body.username,
        password = req.body.password,
        email = req.body.email,
        displayName = req.body.displayName;

  if (!username || !password || !email) {
    req.flash('error', 'Please, fill in all the fields.');
    return res.redirect('signup');
  }

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);

  var newUser = {
    username: username,
    salt: salt,
    email: email,
    displayName: displayName,
    password: hashedPassword
  };

  User.create(newUser).then(function (user){
    req.logIn(user, err => {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      return res.redirect('/login');
    });
  }).catch(function (error) {
    if (error){
      const messages = error.errors.map(function(data){
        return {
          message: data.path+' : '+data.message,
          type: 'error'
        }
      });
      req.flash('errors', messages);
    }
    res.redirect('/signup');
  });
};

module.exports.authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});
