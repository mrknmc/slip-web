// app.js
var express = require('express');
var passport = require('passport');
var logfmt = require('logfmt');
// var Dropbox = require('dropbox');
var app = express();

// var APP_KEY = '492mxhrdjmsxqkz';

// app.engine('jade', require('jade').__express);
app.use(logfmt.requestLogger());
app.use(express.static('./dist'));


// app.get('/login', function(req, res) {
//   var client = new Dropbox.Client({key: APP_KEY});
//   if (client.isAuthenticated()) {
//     // authenticated, show normal page
//   } else {
//     // redirect to login page
//     client.authDriver.
//     // client.authenticate({interactive: true}, function (error) {
//       // if (error) {
//         alert('Authentication error: ' + error);
//       // }
//     // });
//   }
// });

// app.get('/', function(req, res) {
//   var client = new Dropbox.Client({key: APP_KEY});
//   if (client.isAuthenticated()) {
//     // authenticated, show normal page
//   } else {
//     // redirect to login page
//     res.redirect('login');
//   }
// });

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
