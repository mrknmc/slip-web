var Backbone = require('backbone');
var _ = require('lodash');
var moment = require('moment');
var util = require('../util');


module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: function() {
    return {
      color: '#ff8c00',
      yAxis: {
        title: 'Light Intensity',
        labels: {
          formatter: function () {
            return this.value + ' W/m\xB2';
          }
        }
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

  tickInterval: function()  {
    return 45;
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
    return util.intensities(this.get('solar'));
  },

  getData: function() {
    // have some sensible filter defaults
    var filter = this.get('filter');
    var solar = this.get('solar');
    return _(solar)
      .map(function (m) {
        return {
          // convert to millis
          x: moment(m.timestamp, 'X'),
          y: _.max(m.values),
        };
      }).filter(function (m) {
        return m.x >= filter.start && m.x < moment(filter.end).add(1, 'days');
    }).value();
  },

});
