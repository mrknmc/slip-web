var Backbone = require('backbone');
var Solar = require('../models/solarv2');
var Wind = require('../models/windv2');

var Measurements = Backbone.Collection.extend({

});

var solar = new Measurements([], {model: Solar});
solar.url = '/api/solarv2';
exports.solar = solar;

var wind = new Measurements([], {model: Wind});
wind.url = '/api/windv2';
exports.wind = wind;

