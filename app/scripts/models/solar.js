var Backbone = require('backbone');
var _ = require('lodash');
var moment = require('moment');
var util = require('../util');


module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: function() {
    return {
      colors: [
        '#331c00',
        '#bb6700',
        '#ffba66',
      ],
      type: 'spline',
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
        spline: {
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

  ringIntensities: function() {
    return util.ringIntensities(this.get('solar'));
  },

  getColor: function() {
    return this.get('colors')[2];
  },

  getRing: function(ring) {
    // have some sensible filter defaults
    var filter = this.get('filter');
    var solar = this.get('solar');
    return _(this.ringIntensities())
      .map(function (m) {
        return {
          // convert to millis
          x: moment(m.timestamp, 'X'),
          y: m.values[ring],
        };
      }).filter(function (m) {
        return m.x >= filter.start && m.x < moment(filter.end).add(1, 'days');
    }).value();
  },

  getSeries: function() {
    var model = this;
    return _.map([0, 1, 2], function(ring) {
      return {
        color: model.get('colors')[ring],
        name: model.get('_id'),
        data: model.getRing(ring),
      };
    });
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
