var Upload = require('./models').Upload;
var handleError = require('./util').handleError;


exports.findAll = function (req, res) {
  Upload
    .aggregate()
    // unwind the measurements
    .unwind('measurements')
    // group by deviceId
    .group({
      _id: '$deviceId',
      measurements: {$push: '$measurements'}
    })
    // only return lightIntensity and timestamp
    .project('measurements.lightIntensities measurements.timestamp')
    .exec(function(err, objs) {
      if (err) {
        handleError(err, res);
      } else {
        res.json(objs);
      }
  });
};
