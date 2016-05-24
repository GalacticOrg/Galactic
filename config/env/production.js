
/**
 * Expose
 */

module.exports = {
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/galactic_prod',
  neo4jdb: process.env.GRAPHENEDB_URL || 'http://neo4j:rambert@localhost:7474',
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
