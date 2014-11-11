var Backbone = require('backbone');
var _ = require('lodash');
var moment = require('moment');
var util = require('../util');


module.exports = Backbone.Model.extend({
  defaults: function() {
    return {
      color: '#ff8c00',
      yAxis: {
        title: 'Light Intensity',
      },
      xAxis: {
        type: 'datetime',
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.4,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                  enabled: true
              }
            }
          },
          tooltip: {
            valueDecimals: 2,
          }
        },
      },
    };
  },

  initialize: function() {
    var msrments = this.get('solar');
    var end = moment(msrments[msrments.length - 1].timestamp, 'X');
    this.set('filter', {
      end: end,
      start: moment(end).add(-7, 'days'),
    });
  },

  title: function() {
    return {text: this.get('_id') + ': Solar Power'};
  },

  intensities: function() {
    var msrments = this.get('solar');
    return _.map(msrments, function(m) {
      var inRing = util.innerRing(m);
      var midRing = util.middleRing(m);
      var outRing = util.outerRing(m);
      return _.zip(inRing, midRing, outRing)
        .map(function(vals) {
          // computes sum
          return _.reduce(vals, function(sum, num) {
            return sum + num;
          });
      });
    }).reduce(function(result, vec, key) {
      for (var i = vec.length - 1; i >= 0; i--) {
        result[i] += vec[i];
      }
      return result;
    });
  },

  getData: function() {
    // have some sensible filter defaults
    var filter = this.get('filter');
    return _(this.get('solar'))
      .map(function (m) {
        return {
          // convert to millis
          x: moment(m.timestamp, 'X'),
          y: util.intensitySum(m),
        };
      }).filter(function (m) {
        return m.x >= filter.start && m.x < moment(filter.end).add(1, 'days');
    }).value();
  },

});
