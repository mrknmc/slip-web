var _ = require('lodash');
var Upload = require('./models').Upload;
var handleError = require('./util').handleError;


exports.findAll = function (req, res) {
  Upload.distinct('deviceId', function(err, objs) {
      if (err) {
        handleError(err, res);
      } else {
        res.json(_.map(objs, function(o){
          return {deviceId: o};
        }));
      }
  });
};
