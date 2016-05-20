
/*!
 * Module dependencies.
 */

exports.home = function (req, res) {
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

exports.connect = function (req, res) {
  res.render('Connect/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

exports.result = function (req, res) {
  res.render('result/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

exports.user = function (req, res) {
  res.render('user/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};
