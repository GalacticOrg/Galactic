import request from 'superagent'
const csrf = document.getElementById('csrf');
const csrfToken = csrf?csrf.content:'';
const TIMEOUT = 12000;

const handler = (errHandle, cb) => {
  return (err, result) => err?
    errHandle(err):
    cb(err, result);
}

export function Get(url, params = {}, errHandle, cb){
  return request
  .get(url)
  .query(params)
  .timeout(TIMEOUT)
  .set('Accept', 'application/json')
  .end(handler(errHandle, cb))
}

export function Post(url, data = {}, errHandle, cb){
  data['_csrf'] = csrfToken;
  return request
  .post(url)
  .send({'_csrf': csrfToken})
  .timeout(TIMEOUT)
  .set('Accept', 'application/json')
  .end(handler(errHandle, cb))
}
