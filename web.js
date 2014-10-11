var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var logfmt = require('logfmt');
var _ = require('underscore');
var bodyParser = require('body-parser');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var models = require('./models');

var app = express();

app.set('views', __dirname + '/dist/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.use(logfmt.requestLogger());
app.use(bodyParser.json());
app.use(session({secret: 'IgnoSHA-1', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/styles', express.static(__dirname + '/dist/styles'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));

mongoose.connect(process.env.MONGOHQ_URL);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOne({oauthID: profile.id}, function(err, user) {
      if (err) {
        // Probably let the user know he can't login
      } else if (user !== null) {
        // let the user know he's logged in
        done(err, user);
      }
    });
  }
));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/callback',
  passport.authenticate('google', {successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true}));

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
    // Create obj for every measurement
    models.Measurement.create(measurement, function (err, small) {
      if (err) {
        // save error with other errors
        errors.push(err);
      }
    });
  });
  if (errors.length === 0) {
    res.status(201).end();
  } else {
    // return all errors at once
    res.status(400).json(errors);
  }
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.render('index', {username: req.user.name});
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
