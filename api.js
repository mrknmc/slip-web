var express = require('express');
var jwt = require('express-jwt');

var models = require('./models');

var router = express.Router();

router.route('/measurements')
.get(function(req, res) {
  if (!req.accepts('application/json')) {
    // check json header
    return res.sendStatus(406);
  }
  var query = models.Measurement.find(function (err, measurements) {
    if (err) {
      return res.json(err);
    } else {
      return res.json(measurements);
    }
  });
})
.post(function(req, res) {
  if (!req.is('application/json')) {
    return res.sendStatus(415);
  }
  var measurements = req.body;
  var errors = [];
  _.each(measurements, function(measurement) {
    // Create obj for every measurement
    models.Measurement.create(measurement, function (err, small) {
      if (err) {
        // save error with other errors
        errors.push(err);
      }
    });
  });
  if (errors.length === 0) {
    res.sendStatus(201);
  } else {
    // return all errors at once
    res.status(400).json(errors);
  }
});

module.exports = router;
