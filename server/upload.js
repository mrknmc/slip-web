var models = require('./models');
var redisClient = require('./redisClient');
var User = models.User;
var Upload = models.Upload;
var google = require('googleapis');

// Set-up Google Client, secret and url not used
var oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, 0, 'http://localhost');
var GOOGLE_PUB_KEY_STR = 'google';
var ONE_DAY = 86400;


exports.findById = function (req, res) {
  Upload
    .findById(req.params.id)
    .populate('user', 'name email')
    .exec(function (err, upload) {
      if (err) {
        // Error while executing
        res.json({'error': err.message});
      } else if (upload) {
        // Retrieved a measurement
        res.json(upload);
      } else {
        // Measurement not found
        res.status(404).json({});
      }
  });
};


exports.deleteById = function (req, res) {
  Upload.remove({_id: req.params.id}, function(err, upload) {
    if (err) {
      res.json({'error': err.message});
    } else if (upload) {
      res.json(upload);
    } else {
      res.status(404).json({});
    }
  });
};


exports.findAll = function(req, res) {
  Upload
    .find()
    .populate('user', 'name email')
    .exec(function (err, uploads) {
      if (err) {
        // Error while executing
        res.json({'error': err.message});
      } else {
        // Measurements found or not
        res.json(uploads);
      }
  });
};


exports.addUpload = function(req, res) {
  var data = req.body;
  // User.findOne({email: 'mark.nemec@gmail.com'}, function (err, user) {
  //   if (err) {
  //     // Error while executing
  //     throw new Error('Problem accessing MongoDB.');
  //   } else if (user) {
  //     // user authorized - remove token, add user id and date
  //     var upload = _.chain(data)
  //       .omit('token')
  //       .extend({user: user._id, created: Date.now()})
  //       .value();
  //     Upload.create(upload, function(err, upload) {
  //       if (err) {
  //         res.status(400).json({'error': err.message});
  //       } else {
  //         res.status(201).json(upload);
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
      createUploadIfValid(data, certs, function(err, obj) {
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
          createUploadIfValid(data, certs, function(err, obj) {
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


function createUploadIfValid(data, certs, callback) {
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
