var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    User = require('./model/User.js');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findOne({
        where: {
          $or: [
            { 'username': username },
            { 'email' : username }
          ]
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect username, email or password.' });
        }

        var hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect username, email or password.' });
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({
      where: {
        'id': id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }
      done(null, user);
    });
  });
};
