var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ensureAuthenticated = require('./auth').ensureAuthenticated;
var user = require('./user');
var upload = require('./upload');
var measurement = require('./measurement');
var solar = require('./solar');
var wind = require('./wind');

var router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.MONGOHQ_URL);

// Ensure requests are json
router.use(bodyParser.json());


// User
router.get('/user', ensureAuthenticated, user.findAll);
router.get('/user/:id', ensureAuthenticated, user.findById);
router.post('/user', ensureAuthenticated, user.addUser);
router.delete('/user/:id', ensureAuthenticated, user.deleteById);


// Upload
router.get('/upload', ensureAuthenticated, upload.findAll);
router.get('/upload/:id', ensureAuthenticated, upload.findById);
router.post('/upload', upload.addUpload);
router.delete('/upload/:id', ensureAuthenticated, upload.deleteById);


// Solar and Wind
router.get('/solar', ensureAuthenticated, solar.findAll);
router.get('/wind', ensureAuthenticated, wind.findAll);


// Legacy Measurements
router.get('/measurements', ensureAuthenticated, measurement.findAll);
router.get('/measurements/:id', ensureAuthenticated, measurement.findById);
router.post('/measurements', measurement.addMeasurement);
router.delete('/measurements/:id', ensureAuthenticated, measurement.deleteById);


module.exports = router;
