var Measurement = require('./models').Measurement;
var handleError = require('./util').handleError;

exports.findAll = function (req, res) {
  Measurement
    .aggregate()
    // unwind the measurements
    .unwind('measurements')
    // group by deviceId
    .group({
      _id: '$deviceId',
      measurements: {$push: '$measurements'}
    })
    // only return lightIntensity and timestamp
    .project('measurements.windSpeed measurements.windDirection measurements.timestamp')
    .exec(function(err, objs) {
      if (err) {
        handleError(err, res);
      } else {
        res.json(objs);
      }
  });
};
