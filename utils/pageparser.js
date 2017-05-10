

const request = require('superagent'),
  config = require('../config'),
  extractor = require('unfluff'),
  cheerio = require('cheerio'),
  baseDiffBotBaseUri = config.DIFFBOT_URI,
  diffBotVersion = config.DIFFBOT_API_VERISON,
  nytVersion = config.NYT_API_VERISON,
  tokenNyt = config.NYT_API_TOKEN,
  nytBaseUri = config.NYT_SEARCH_API_URI,
  tokenDiffbot = config.DIFFBOT_TOKEN,
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
      if (err || res.body.response.docs.length === 0) {
        cb({ err:err });
      } else {
        cb(null, res.body.response.docs[0]);
      }
    });
};


module.exports.pareLinksHtml = function (html){
  const $ = cheerio.load(html);
  const aTags = $('a');
  let links = $(aTags).map(function (i, el){
    return $(this).attr('href');
  }).get();
  console.log(links);
  return links.filter(function (link){ return typeof link === 'string' && isValidURI(link); });
};



const isValidURI = function (uri){
  return new RegExp(expression).test(uri);
}
module.exports.isValidURI = isValidURI;
