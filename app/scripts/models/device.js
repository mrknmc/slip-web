var Backbone = require('backbone');
var _ = require('lodash');
var moment = require('moment');
var util = require('../util');


module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: function() {
    return {
      'solarTotal': [0, 0, 0, 0, 0, 0, 0, 0],
      'windSpeedTotal': [0, 0, 0, 0, 0, 0, 0, 0],
      'coords': [],
    };
  },

  bestSolarOrientation: function() {
    var solarTotal = this.get('solarTotal');
    // shitty way of getting the maximum
    var maxSolar = _.max(solarTotal);
    var maxIndex = _.indexOf(solarTotal, maxSolar);
    return util.orientations[maxIndex];
  },

  bestWindOrientation: function() {
    var windTotal = this.get('windSpeedTotal');
    // shitty way of getting the maximum
    var maxWind = _.max(windTotal);
    var maxIndex = _.indexOf(windTotal, maxWind);
    return util.orientations[maxIndex];
  },

  solarSum: function() {
    return _.reduce(this.get('solarTotal'), function(sum, num) {
      return sum + num;
    });
  },

  windSpeedSum: function() {
    return _.reduce(this.get('windSpeedTotal'), function(sum, num) {
      return sum + num;
    });
  },

  minSolarDate: function() {
    return moment(this.get('minSolarTimestamp'), 'X').format('llll');
  },

  minWindDate: function() {
    return moment(this.get('minWindTimestamp'), 'X').format('llll');
  },

  maxSolarDate: function() {
    return moment(this.get('maxSolarTimestamp'), 'X').format('llll');
  },

  maxWindDate: function() {
    return moment(this.get('maxWindTimestamp'), 'X').format('llll');
  },

  initialize: function() {},

  toDisplay: function() {
    return _.assign(this.toJSON(), {
      bestSolarOrientation: this.bestSolarOrientation(),
      bestWindOrientation: this.bestWindOrientation(),
      solarSum: this.solarSum().toLocaleString(),
      windSpeedSum: this.windSpeedSum().toLocaleString(),
      minSolarDate: this.minSolarDate(),
      minWindDate: this.minWindDate(),
      maxSolarDate: this.maxSolarDate(),
      maxWindDate: this.maxWindDate(),
      coords: _.uniq(this.get('coords')),
    });
  },

});
