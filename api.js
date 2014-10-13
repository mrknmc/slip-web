var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var url = require('url');
var _ = require('underscore');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var models = require('./models');

var router = express.Router();

var GOOGLE_PUB_KEY_STR = 'google';
var ONE_DAY = 86400;

// Ensure requests are json
router.use(bodyParser.json());

// Set-up Google Client, info not important (not used)
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, 0, 'http://localhost');

// Connect to Redis
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
redisClient.auth(redisURL.auth.split(':')[1]);

router.route('/measurements')
.get(function(req, res) {
  var query = models.Measurement.find(function (err, measurements) {
    if (err) {
      res.json(err);
    } else {
      res.json(measurements);
    }
  });
})
.post(function(req, res) {
  var data = req.body;

  redisClient.get(GOOGLE_PUB_KEY_STR, function(err, reply) {
    if (reply !== null) {
      // certificates were in Redis
      var certs = JSON.parse(reply.toString());
      createMeasurementIfValid(data, certs, function(err, obj) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(obj);
        }
      });
    } else {
      // if reply is null then key is missing
      // make a request to get key from google and store in Redis
      oauth2Client.getFederatedSignonCerts(function(err, certs) {
        if (err) {
          console.log('dammit certs error');
        } else {
          // store certs in Redis
          redisClient.setex(GOOGLE_PUB_KEY_STR, ONE_DAY, JSON.stringify(certs));
          // create measurement if valid
          createMeasurementIfValid(data, certs, function(err, obj) {
            if (err) {
              res.status(400).json(err);
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
    oauth2Client.verifySignedJwtWithCerts(data.token, certs);
    models.Measurement.create(_.omit(data, 'token'), function(err, obj) {
      callback(null, obj);
    });
  } catch (err) {
    console.log('ERROR: ' + err);
    callback(err, null);
  }
}

module.exports = router;
