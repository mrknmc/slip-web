var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redis = require('redis');
var url = require('url');
var _ = require('underscore');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var ensureAuthenticated = require('./auth').ensureAuthenticated;

var models = require('../models');

var router = express.Router();

var GOOGLE_PUB_KEY_STR = 'google';
var ONE_DAY = 86400;

// Connect to MongoDB
mongoose.connect(process.env.MONGOHQ_URL);

// Ensure requests are json
router.use(bodyParser.json());

// Set-up Google Client, secret and url not used
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, 0, 'http://localhost');

// Connect to Redis
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
redisClient.auth(redisURL.auth.split(':')[1]);


router.get('/solar', ensureAuthenticated, function (req, res) {
  models.Measurement
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
});

router.get('/wind', ensureAuthenticated, function (req, res) {
  models.Measurement
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
        // Error while executing
        res.json({'error': err.message});
      } else {
        // Measurements found or not
        res.json(objs);
      }
  });
});

router.get('/users/:id', ensureAuthenticated, function (req, res) {
  // only expose email and name
  models.User.findById(req.params.id, 'email name', function (err, user) {
    if (err) {
      // Error while executing
      res.json({'error': err.message});
    } else if (user) {
      // Retrieved a user
      res.json(user);
    } else {
      // User not found
      res.status(404).json({});
    }
  });
});


router.get('/measurements/:id', ensureAuthenticated, function (req, res) {
  models.Measurement.findById(req.params.id).populate('user', 'name email').exec(function (err, msrment) {
    if (err) {
      // Error while executing
      res.json({'error': err.message});
    } else if (msrment) {
      // Retrieved a measurement
      res.json(msrment);
    } else {
      // Measurement not found
      res.status(404).json({});
    }
  });
});


router.get('/measurements', ensureAuthenticated, function(req, res) {
  models.Measurement.find().populate('user', 'name email').exec(function (err, measurements) {
    if (err) {
      // Error while executing
      res.json({'error': err.message});
    } else {
      // Measurements found or not
      res.json(measurements);
    }
  });
});


router.post('/measurements', function(req, res) {
  var data = req.body;

  redisClient.get(GOOGLE_PUB_KEY_STR, function(err, reply) {
    if (reply !== null) {
      // certificates were in Redis
      var certs = JSON.parse(reply.toString());
      createMeasurementIfValid(data, certs, function(err, obj) {
        if (err) {
          res.status(400).json({'error': err.message});
        } else {
          res.status(201).json(obj);
        }
      });
    } else {
      // make a request to get key from google and store in Redis
      oauth2Client.getFederatedSignonCerts(function(err, certs) {
        if (err) {
          // Google is down?, I'm a teapot
          res.status(418).json({'error': 'Could not get certificates from Google.'});
        } else {
          // store certs in Redis
          redisClient.setex(GOOGLE_PUB_KEY_STR, ONE_DAY, JSON.stringify(certs));
          // create measurement if valid
          createMeasurementIfValid(data, certs, function(err, obj) {
            if (err) {
              res.status(400).json({'error': err.message});
            } else {
              res.status(201).json(obj);
            }
          });
        }
      });
    }
  });
});


function createMeasurementIfValid(data, certs, callback) {
  try {
    // Try verify the JWT
    var loginTicket = oauth2Client.verifySignedJwtWithCerts(data.token, certs);
    // Confirm that user is authorized
    models.User.findOne({oauthID: loginTicket.getUserId()}, function (err, user) {
      if (err) {
        // Error while executing
        throw new Error('Problem accessing MongoDB.');
      } else if (user) {
        // user authorized - remove token, add user id and date
        var msrment = _.chain(data)
          .omit('token')
          .extend({user: user._id, created: Date.now()})
          .value();
        models.Measurement.create(msrment, callback);
      } else {
        // User is not authorized to POST data
        throw new Error('User not authorized.');
      }
    });
  } catch (err) {
    callback(err, null);
  }
}

module.exports = router;
