
require('dotenv').config();
const request = require('superagent'),
  baseDiffBotBaseUri = process.env.DIFFBOT_URI,
  diffBotVersion = process.env.DIFFBOT_API_VERISON,
  token = process.env.DIFFBOT_TOKEN,
  diffBotApiUri = 'https://' + baseDiffBotBaseUri+'/' + diffBotVersion;

module.exports = function (inputURI, cb){
  request
    .get(diffBotApiUri + '/analyze')
    .query({ token: token, url: inputURI })
    .set('Accept', 'application/json')
    .end(function (err, res){
      if (err) {
        cb(err);
      } else {
        cb(null, res.body);
      }
    });
};
