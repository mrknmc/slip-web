// app.js
var express = require('express');
var mongoose = require('mongoose');
var logfmt = require('logfmt');
var _ = require('underscore');
var bodyParser = require('body-parser');
var models = require('./models');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGOHQ_URL);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GoogleStrategy({
    returnURL: 'http://aslip.herokuapp.com/auth/google/return',
    realm: 'http://aslip.herokuapp.com/'
  },
  function(identifier, profile, done) {
    models.User.findOne({oauthID: identifier}, function(err, user) {
      if(err) {
        // Probably let the user know he can't login
      }
      if (!err && user !== null) {
        // let the user know he's logged in
        done(null, user);
      }
    });
  }
));

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
  passport.authenticate('google', {successRedirect: '/',
                                   failureRedirect: '/login'}));

app.route('/measurements')
.get(function(req, res) {
  var query = models.Measurement.find(function (err, measurements) {
    if (err) {
      return res.json(err);
    } else {
      return res.json(measurements);
    }
  });
})
.post(function(req, res) {
  var measurements = req.body;
  var errors = [];
  _.each(measurements, function(measurement) {
    models.Measurement.create(measurement, function (err, small) {
      if (err) {
        errors.push(err);
      }
    });
  });
  if (errors.length === 0) {
    console.log('sucessful POST');
    res.status(201);
  } else {
    console.log('failed POST');
    res.status(400).json(errors);
  }
});

app.use(logfmt.requestLogger());
app.use(express.static('./dist'));

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
