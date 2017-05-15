

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
  mozAccessId = config.MOZACCESSID,
  mozsig = config.MOZSIG,
  diffBotApiUri = 'https://' + baseDiffBotBaseUri + '/' + diffBotVersion,
  nytApiUri = 'http://' + nytBaseUri + '/' + nytVersion,
  seomozUrl = 'https://lsapi.seomoz.com/linkscape/links',
  expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;


// ?SourceCols=4
// &Scope=page_to_page
// &Sort=page_authority
// &Limit=20

module.exports.mozLinks = function (inputURI, cb){
  console.log(mozsig, mozAccessId);
  request
    .get(seomozUrl + '/stamen.com')
    .auth('mozscape-28051f6de4', '5d727b77bf4519abe0ed79b1ac59aa2c')
    .query({
      Scope: 'page_to_page',
      Sort: 'page_authority',
      Limit: 20,
      SourceCols: '4'
    })
    .timeout({
      response: 60000,
      deadline: 90000
    })
    .set('Accept', 'application/json')
    .end(function (err, res){
      if (err){
        return cb({
          status:err.status,
          message: 'Moz Failed'
        });
      }
      const sites = JSON.parse(res.text);
      const links = sites.map(function (site){ return site.uu;});
      cb(null, links);
      // if (err || res.body.error) {
      //   const message = err || res.body.error;
      //   cb(message);
      // } else {
      //   const result = res.body.objects[0]
      //   cb(null, result);
      // }
    });
};

module.exports.diffBotAnalyze = function (inputURI, cb){
  request
    .get(diffBotApiUri + '/analyze')
    .query({
      token: tokenDiffbot,
      url: inputURI,
      fields: 'links,sentiment,meta'
    })
    .timeout({
      response: 60000,
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
      response: 6000,
      deadline: 10000
    })
    .end(function (err, res){
      if (err) {
        cb(err);
      } else {
        const text = res.text;
        if ( typeof text !== 'string' ){
          return cb({
            message: 'No Text returned'
          });
        } else {
          const data = extractor(text);
          cb(null, data);
        }
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
      response: 6000,
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
