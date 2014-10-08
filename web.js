// app.js
var express = require('express');
var passport = require('passport');
var logfmt = require('logfmt');
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static('./dist'));

app.post('/login',
         passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'}));

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
