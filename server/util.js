var logfmt = require('logfmt');

exports.handleError = function(err, res) {
  logfmt.error(err);
  res.status(500).json({'error': err.message});
};
