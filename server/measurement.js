var models = require('./models');
var redisClient = require('./redisClient');
var User = models.User;
var Measurement = models.Measurement;
var handleError = require('./util').handleError;
var _ = require('lodash');
var google = require('googleapis');

// Set-up Google Client, secret and url not used
var oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, 0, 'http://localhost');
var GOOGLE_PUB_KEY_STR = 'google';
var ONE_DAY = 86400;


exports.findById = function (req, res) {
  Measurement
    .findById(req.params.id)
    .populate('user', 'name email')
    .exec(function (err, msrment) {
      if (err) {
        handleError(err, res);
      } else if (msrment) {
        res.json(msrment);
      } else {
        res.status(404).json({});
      }
  });
};


exports.deleteById = function (req, res) {
  Measurement.findByIdAndRemove(req.params.id, function(err, msrment) {
    if (err) {
      handleError(err, res);
    } else if (msrment) {
      res.json(msrment);
    } else {
      res.status(404).json({});
    }
  });
};


exports.findAll = function(req, res) {
  Measurement
    .find()
    .populate('user', 'name email')
    .exec(function (err, measurements) {
      if (err) {
        handleError(err, res);
      } else {
        res.json(measurements);
      }
  });
};


exports.addMeasurement = function(req, res) {
  var msrment = _.chain(req.body)
    .omit('token')
    .extend({user: req.user._id, created: Date.now()})
    .value();

  Measurement.create(msrment, function(err, msrment) {
    if (err) {
      handleError(err, res);
    } else if (msrment) {
      res.status(201).json(msrment);
    }
  });
};
