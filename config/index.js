if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

module.exports = {
  AWS_KEY : process.env.AWS_KEY,
  AWS_SECRET : process.env.AWS_SECRET,
  AWS_BUCKET : process.env.AWS_BUCKET,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL
};
