
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/galactic_development',
  neo4jdb: 'http://neo4j:neo4j@localhost:7474',
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
