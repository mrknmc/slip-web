var Backbone = require('backbone');
var Solar = require('../models/solar');
var Wind = require('../models/wind');

var Measurements = Backbone.Collection.extend({

});

var solar = new Measurements([], {model: Solar});
solar.url = '/api/solar';
exports.solar = solar;

var wind = new Measurements([], {model: Wind});
wind.url = '/api/wind';
exports.wind = wind;

