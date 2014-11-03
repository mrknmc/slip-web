var models = require('./models');
var redisClient = require('./redisClient');
var User = models.User;
var Measurement = models.Measurement;
var _ = require('underscore');
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
};


exports.deleteById = function (req, res) {
  Measurement.findByIdAndRemove(req.params.id, function(err, msrment) {
    if (err) {
      res.json({'error': err.message});
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
        // Error while executing
        res.json({'error': err.message});
      } else {
        // Measurements found or not
        res.json(measurements);
      }
  });
};


exports.addMeasurement = function(req, res) {
  var data = req.body;

  // User.findOne({email: 'mark.nemec@gmail.com'}, function (err, user) {
  //   if (err) {
  //     // Error while executing
  //     throw new Error('Problem accessing MongoDB.');
  //   } else if (user) {
  //     // user authorized - remove token, add user id and date
  //     var msrment = _.chain(data)
  //       .omit('token')
  //       .extend({user: user._id, created: Date.now()})
  //       .value();
  //     Measurement.create(msrment, function(err, obj) {
  //       if (err) {
  //         res.status(400).json({'error': err.message});
  //       } else {
  //         res.status(201).json(obj);
  //       }
  //     });
  //   } else {
  //     // User is not authorized to POST data
  //     throw new Error('User not authorized.');
  //   }
  // });
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
};


function createMeasurementIfValid(data, certs, callback) {
  try {
    // Try verify the JWT
    var loginTicket = oauth2Client.verifySignedJwtWithCerts(data.token, certs);
    // Confirm that user is authorized
    User.findOne({oauthID: loginTicket.getUserId()}, function (err, user) {
      if (err) {
        // Error while executing
        throw new Error('Problem accessing MongoDB.');
      } else if (user) {
        // user authorized - remove token, add user id and date
        var msrment = _.chain(data)
          .omit('token')
          .extend({user: user._id, created: Date.now()})
          .value();
        Measurement.create(msrment, callback);
      } else {
        // User is not authorized to POST data
        throw new Error('User not authorized.');
      }
    });
  } catch (err) {
    callback(err, null);
  }
}
