'use strict';
/**
 * Read Profile
 */
exports.getReadControllerProfile = function (req, res) {
  res.send({
    user:req.user,
    success: !!req.user
  });
};
