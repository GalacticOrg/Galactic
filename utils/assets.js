const request = require('superagent'),
      fs = require('fs'),
      sizeOf = require('image-size'),
      config = require('../config'),
      awsKey = config.AWS_KEY,
      awsSecret = config.AWS_SECRET,
      awsBucket = config.AWS_BUCKET,
      URL = require('url-parse'),
      knox = require('knox'),
      client = knox.createClient({
        key: awsKey,
        secret: awsSecret,
        bucket: awsBucket
      });
/**
 * @name   upload to CDN
 * @desc   upload a file to S3
 * @param  {string}      url [description]
 * @return {string}          header
 */
module.exports.upload = function (url, uID, cb){
  if (!url){ return cb({
      status: 'No valid URL provided for upload.'
    }, null);}
  const path = URL(url).pathname;
  const _extension = path.match( /\.([0-9a-z]+)(?:[\?#]|$)/i);
  const extension = _extension ? _extension[0] : null;

  const location = '/tmp/' + uID + extension;
  const destination = fs.createWriteStream(location);

  request(url, function (err, res){
    if ( !err && res && res.statusCode === 200 && res.type.match(/image/) !== null ){
      request(url).pipe(destination)
        .on('finish', finish)
        .on('error', error);
    } else {
      cb({ status: 'File Download failed' }, null);
    }
  });

  const finish = function (err, res){
    const stats = fs.statSync(location);
    const fileSizeInBytes = stats['size'];
    if (fileSizeInBytes === 0){
      const err = { status: 'File upload is empty' };
      console.log(err, 'copyAssets fileSizeInBytes');

      return cb(err, null, null);
    }
    const req = client.put(uID + extension, {
      'Content-Length': fileSizeInBytes,
      'x-amz-acl': 'public-read'
    });
    fs.createReadStream(location).pipe(req);
    req.on('response', function (knoxRes){
        if (200 == knoxRes.statusCode) {
          const dimensions = location.match(/\.gif|\.jpg|\.jpeg|\.png/) !== null ?
            (function (){
             const size = sizeOf(location);
              return [size.width, size.height];
            })() :
            [];
          cb(null, req.url, dimensions);
        } else {
          console.log(knoxRes.statusCode, 'knoxRes Err StatusCode');
          cb({ status: 'S3 Upload Failed' }, null, null);
        }
    });
  };

  const error = function (error){
    console.log(error, 'file error');
    cb({
      status: 'File Downlod failed'
    }, null);
  };
}

module.exports.uploadBuffer = function (buffer, size, uid, cb){
  const headers = {
      'Content-Length': size,
      'Content-Type': 'image/jpeg'
  };

  const req = client.putBuffer(buffer, 'profile_image_'+uid+'.jpeg', headers, function (err, res){
    console.log(req.url);
    if (200 == res.statusCode) {
      cb(null, req.url)
    } else {
      console.log('file did not upload');
      cb({
        type:'error',
        message: 'File did not upload. Please try again.'
      });
    }
  });
};
