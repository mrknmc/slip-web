// app.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.set('views', __dirname + '/dist');

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(logfmt.requestLogger());
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/styles', express.static(__dirname + '/dist/styles'));

app.get('/', function(req, res) {
  res.render('index');
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});
