import request from 'superagent';
const csrf = document.getElementById('csrf');
const csrfToken = csrf ? csrf.content : '';
const TIMEOUT = 12000;
let _pendingRequests = [];

const handler = (errHandle, cb) => {
  return (err, result) => err ?
    errHandle(err) :
    cb(err, result);
};

export function Get (url, params = {}, key, errHandle, cb){

  abortPendingRequests(key);

  _pendingRequests[key] = request
  .get(url)
  .query(params)
  .timeout(TIMEOUT)
  .set('Accept', 'application/json')
  .end(handler(errHandle, cb));

  return _pendingRequests[key];
}

export function Post (url, data = {}, key, errHandle, cb){

  abortPendingRequests(key);
  _pendingRequests[key] = request
    .post(url)
    .send({ '_csrf': csrfToken })
    .send(data)
    .timeout(TIMEOUT)
    .set('Accept', 'application/json')
    .end(handler(errHandle, cb));

  return _pendingRequests[key];
}

function abortPendingRequests (key){
  if (_pendingRequests[key]) {
    _pendingRequests[key]._callback = function (){};
    _pendingRequests[key].abort();
    _pendingRequests[key] = null;
  }
}
