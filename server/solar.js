var Upload = require('./models').Upload;
var handleError = require('./util').handleError;


exports.findAll = function (req, res) {
  Upload.aggregate([
    {
      $project: {
        solar: 1,
        deviceId: 1,
      }
    },
    { $unwind: '$solar' },
    { $sort: { 'deviceId': 1, 'solar.timestamp': 1} },
    { $group: {
        _id: '$deviceId',
        solar: { $push: '$solar' }
      }
    }
  ], function(err, objs) {
      if (err) {
        handleError(err, res);
      } else {
        res.json(objs);
      }
  });
};
