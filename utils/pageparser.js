
require('dotenv').config();
const request = require('superagent'),
  baseDiffBotBaseUri = process.env.DIFFBOT_URI,
  diffBotVersion = process.env.DIFFBOT_API_VERISON,
  token = process.env.DIFFBOT_TOKEN,
  diffBotApiUri = 'https://' + baseDiffBotBaseUri+'/' + diffBotVersion,
  expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports.diffBotAnalyze = function (inputURI, cb){
  console.log(inputURI , 'inputURIinputURIinputURI')
  request
    .get(diffBotApiUri + '/analyze')
    .query({
      token: token,
      url: inputURI,
      fields: 'links,sentiment,meta'
    })
    // .timeout({
    //   response: 5000,
    //   deadline: 30000,
    // })
    .set('Accept', 'application/json')
    .end(function (err, res){
      if (res.error) {
        cb(err);
      } else {
        console.log(res.body, err, 'err')
        const result = res.body.objects[0]
        cb(null, result);
      }
    });
};

module.exports.isValidURI = function (uri){
  return new RegExp(expression).test(uri);
}
