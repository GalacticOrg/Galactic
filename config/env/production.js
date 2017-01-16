
/**
 * Expose
 */

module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://localhost/galactic_development',
  neo4jdb: process.env.GRAPHENEDB_URL || 'http://neo4j:neo4j@localhost:7474',
  aws:{
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    imagebucket: process.env.IMAGE_BUCKET
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENT_KEY,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: ( process.env.ROOT_URL || 'http://localhost:3000' ) + '/auth/twitter/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  }
};
