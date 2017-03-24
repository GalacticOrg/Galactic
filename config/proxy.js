'use strict';

/*
 * Module dependencies.
 */

const fs = require('fs');
const httpProxy = require('http-proxy');
module.exports = function(){
  httpProxy.createServer({
   ssl: {
     key: fs.readFileSync('./key.pem', 'utf8'),
     cert: fs.readFileSync('./cert.pem', 'utf8'),
     passphrase:'1234'
   },
   target: 'http://localhost:3001',
   secure: false // Depends on your needs, could be false.
  }).listen(443);
}
