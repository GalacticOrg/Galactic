
/*!
 * Module dependencies.
 */

/*Web App Pages*/
exports.home = function (req, res) {
  res.render('home/index', {
    title: 'Home'
  });
};

exports.connect = function (req, res) {
  res.render('connect/index', {
    title: 'Connect'
  });
};

exports.node = function (req, res) {
  res.render('node/index', {
    title: 'Node'
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

/*Static Pages*/

exports.analytics = function (req, res) {
  res.render('Analytics', {
    title: 'Analytics'
  });
};

exports.about = function (req, res) {
  res.render('About', {
    title: 'About'
  });
};

exports.privacy = function (req, res) {
  res.render('Privacy', {
    title: 'Privacy'
  });
};

exports.terms = function (req, res) {
  res.render('Terms', {
    title: 'Terms'
  });
};

exports.fivehundred = function (req, res, next) {
  res.render('TermyDoesnot', {
    title: 'Terms'
  });
  // next({message:'err', stack:['1','2']})
};
