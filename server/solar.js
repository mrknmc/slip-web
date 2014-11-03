var Measurement = require('./models').Measurement;


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
    .project('measurements.lightIntensity measurements.timestamp')
    .exec(function(err, objs) {
      if (err) {
        // Error while executing
        res.json({'error': err.message});
      } else {
        // Measurements found or not
        res.json(objs);
      }
  });
};
