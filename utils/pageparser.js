
require('dotenv').config();
const request = require('superagent'),
  baseDiffBotBaseUri = process.env.DIFFBOT_URI,
  extractor = require('unfluff'),
  diffBotVersion = process.env.DIFFBOT_API_VERISON,
  nytVersion = process.env.NYT_API_VERISON,
  tokenNyt = process.env.NYT_API_TOKEN,
  nytBaseUri = process.env.NYT_SEARCH_API_URI,
  tokenDiffbot = process.env.DIFFBOT_TOKEN,
  diffBotApiUri = 'https://' + baseDiffBotBaseUri + '/' + diffBotVersion,
  nytApiUri = 'http://' + nytBaseUri + '/' + nytVersion,
  expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports.diffBotAnalyze = function (inputURI, cb){
  request
    .get(diffBotApiUri + '/analyze')
    .query({
      token: tokenDiffbot,
      url: inputURI,
      fields: 'links,sentiment,meta'
    })
    .timeout({
      response: 30000,
      deadline: 90000,
    })
    .set('Accept', 'application/json')
    .end(function (err, res){
      if (err || res.body.error) {
        const message = err || res.body.error;
        cb(message);
      } else {
        const result = res.body.objects[0]
        cb(null, result);
      }
    });
};

module.exports.pageParse = function (inputURI, cb){
  request
    .get(inputURI)
    .timeout({
      response: 3000,
      deadline: 10000
    })
    .end(function (err, res){
      if (err) {
        cb(err);
      } else {
        const text = res.text;
        const data = extractor(text);
        cb(null, data);
      }
    });
};

module.exports.pageParseNYT = function (inputURI, cb){
  request
    .get(nytApiUri + '/articlesearch.json')
    .query({
      'api-key': tokenNyt,
      fq: 'web_url:"' + inputURI + '"'
    })
    .timeout({
      response: 3000,
      deadline: 10000
    })
    .end(function (err, res){
      console.log(res.body.response, 'res.body.response')
      if (err || res.body.response.docs.length === 0) {
        cb({err:err});
      } else {
        cb(null, res.body.response.docs[0]);
      }
    });
};




module.exports.isValidURI = function (uri){
  return new RegExp(expression).test(uri);
}
