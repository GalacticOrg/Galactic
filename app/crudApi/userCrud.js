'use strict';
/**
 * Read Profile
 */
exports.getReadControllerProfile = function (req, res) {
  res.status(401).send({
    user:req.user,
    success: !!req.user
  });
};
