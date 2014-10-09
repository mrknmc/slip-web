// app.js
var express = require('express');
var passport = require('passport');
var logfmt = require('logfmt');
var app = express();

// var APP_KEY = '492mxhrdjmsxqkz';

// app.engine('jade', require('jade').__express);
app.use(logfmt.requestLogger());
app.use(express.static('./dist'));

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
