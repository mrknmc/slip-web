var Backbone = require('backbone');
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
    var measurements = this.get('measurements');
    var end = moment(measurements[measurements.length - 1].timestamp, 'X');
    this.set('filter', {
      end: end,
      start: moment(end).add(-7, 'days'),
    });
  },

  title: function() {
    return {text: this.get('_id') + ': Solar Power'};
  },

  getData: function() {
    // have some sensible filter defaults
    var filter = this.get('filter');

    var m = this.get('measurements')[0];
    console.log(m);
    console.log(util.intensitySum(m));
    console.log(util.intensityAngle(m));

    return _.chain(this.get('measurements'))
      .map(function (msrment) {
        return {
          // convert to millis
          x: moment(msrment.timestamp, 'X'),
          y: util.intensitySum(msrment),
        };
      }).filter(function (msrment) {
        return msrment.x >= filter.start && msrment.x < moment(filter.end).add(1, 'days');
    }).value();
  },

});
