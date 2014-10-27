var express = require('express');
var session = require('express-session');
var passport = require('passport');
var logfmt = require('logfmt');

var api = require('./server/api');
var auth = require('./server/auth');

var app = express();
var port = Number(process.env.PORT || 5000);

// Set up Jade
app.set('views', __dirname + '/dist/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.use(logfmt.requestLogger());

// Static files
app.use('/styles', express.static(__dirname + '/dist/styles'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/images', express.static(__dirname + '/dist/images'));

// Middleware
app.use(session({secret: 'IgnoSHA-1', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth.router);
app.use('/api', api);


app.get(['/', '/solar', '/wind', '/uploads', '/map'], function(req, res) {
  if (req.isAuthenticated()) {
    res.render('dashboard', {username: req.user.name});
  } else {
    res.render('index');
  }
});


app.get('/login', function(req, res) {
  res.render('login');
});


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.listen(port, function() {
  console.log('Listening on ' + port);
});
