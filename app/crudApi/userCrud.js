'use strict';
/**
 * Read Profile
 */
exports.getReadControllerProfile = function (req, res) {
  const status = req.user ? 200 : 401;
  res.status(status).send({
    user: req.user,
    success: !!req.user
  });
};
