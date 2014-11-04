var express = require('express');
var logfmt = require('logfmt');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./models').User;
var handleError = require('./util').handleError;
var redisClient = require('./redisClient');
var solar = require('./solar');
var wind = require('./wind');
var user = require('./user');
var upload = require('./upload');
var measurement = require('./measurement');
var google = require('googleapis');


// Set-up Google Client, secret and url not used
var oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, 0, 'http://localhost');
var GOOGLE_PUB_KEY_STR = 'google';
var ONE_DAY = 86400;


// Connect to MongoDB
mongoose.connect(process.env.MONGOHQ_URL);

// Requests are json and user is authorized
var router = express.Router();
router.use(bodyParser.json());
router.use(ensureAuthorized);


// Solar and Wind
router.get('/solar', solar.findAll);
router.get('/wind', wind.findAll);


// Upload
router.post('/upload', upload.addUpload);
router.get('/upload', upload.findAll);
router.get('/upload/:id', upload.findById);
router.delete('/upload/:id', upload.deleteById);


// User
router.post('/user', user.addUser);
router.get('/user', user.findAll);
router.get('/user/:id', user.findById);
router.delete('/user/:id', user.deleteById);


// Legacy Measurements
router.post('/measurements', measurement.addMeasurement);
router.get('/measurements', measurement.findAll);
router.get('/measurements/:id', measurement.findById);
router.delete('/measurements/:id', measurement.deleteById);


function ensureAuthorized(req, res, next) {
  var token = req.body.token;
  if (process.env.NODE_ENV == 'development') {
    // work on localhost
    User.findById('5457c59cdc38bee54b63565a', function(err, user) {
      req.user = user;
      return next();
    });
  }
  else if (req.isAuthenticated()) {
    // for now, authorized == authenticated
    return next();
  } else if (token) {
    // check the token if not authenticated
    redisClient.get(GOOGLE_PUB_KEY_STR, function(err, reply) {
      if (reply !== null) {
        // certificates were in Redis
        var certs = JSON.parse(reply.toString());
        verifyCertsAndToken(token, certs, req, res, next);
      } else {
        // certificates were not in Redis
        oauth2Client.getFederatedSignonCerts(function(err, certs) {
          if (certs !== null) {
            redisClient.setex(GOOGLE_PUB_KEY_STR, ONE_DAY, JSON.stringify(certs));
            verifyCertsAndToken(token, certs, req, res, next);
          } else {
            res.status(418).json({'error': 'Could not retrieve certificates from Google.'});
          }
        });
      }
    });
  } else {
    // otherwise redirect to the login page
    res.redirect('/login');
  }
}


function verifyCertsAndToken(token, certs, req, res, next) {
  try {
    var loginTicket = oauth2Client.verifySignedJwtWithCerts(token, certs);
    User.findOne({oauthID: loginTicket.getUserId()}, function (err, user) {
      if (error) {
        handleError(err, res);
      } else if (user) {
        req.user = user;
        return next();
      } else {
        //user not found - not authorized
        logfmt.error({error: 'Unauthorized user trying to submit data.'});
        res.status(401).json({});
      }
    });
  } catch (err) {
    logfmt.error(err);
    res.status(400).json({'error': err.message});
  }
}


module.exports = router;
