
require('dotenv').config();
const request = require('superagent'),
  baseDiffBotBaseUri = process.env.DIFFBOT_URI,
  diffBotVersion = process.env.DIFFBOT_API_VERISON,
  token = process.env.DIFFBOT_TOKEN,
  diffBotApiUri = 'https://' + baseDiffBotBaseUri+'/' + diffBotVersion,
  expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports.diffBotAnalyze = function (inputURI, cb){
  request
    .get(diffBotApiUri + '/analyze')
    .query({
      token: token,
      url: inputURI,
      fields: 'links,sentiment,meta'
    })
    .set('Accept', 'application/json')
    .end(function (err, res){
      if (err) {
        cb(err);
      } else {
        cb(null, res.body);
      }
    });
};

module.exports.isValidURI = function (uri){
  return new RegExp(expression).test(uri);
}
