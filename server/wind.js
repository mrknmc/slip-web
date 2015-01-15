var Upload = require('./models').Upload;
var handleError = require('./util').handleError;


exports.findAll = function (req, res) {
  Upload.aggregate([
    {
      $project: {
        wind: 1,
        deviceId: 1,
      }
    },
    { $unwind: '$wind' },
    { $sort: { 'deviceId': 1, 'wind.timestamp': 1} },
    { $group: {
        _id: '$deviceId',
        wind: { $push: '$wind' }
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
