
/**
 * Expose
 */
 
module.exports = {
  db: 'mongodb://localhost/galactic_development',
  twitter: {
    clientID: process.env.TWITTER_CLIENT_KEY,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  }
};
