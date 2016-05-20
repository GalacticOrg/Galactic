
/*!
 * Module dependencies.
 */

exports.home = function (req, res) {
  res.render('home/index', {
    title: 'Home'
  });
};

exports.connect = function (req, res) {
  res.render('Connect/index', {
    title: 'Connect'
  });
};

exports.result = function (req, res) {
  res.render('result/index', {
    title: 'Result'
  });
};

exports.user = function (req, res) {
  res.render('user/index', {
    title: 'User'
  });
};

exports.firehose = function (req, res) {
  res.render('firehose/index', {
    title: 'Firehose'
  });
};