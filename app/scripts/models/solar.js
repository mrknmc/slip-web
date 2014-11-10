var Backbone = require('backbone');
var moment = require('moment');

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

  getIntensitySum: function(msrment) {
    var sum = _.reduce(msrment.lightIntensities, function(sum, num) {
      return sum + num;
    });
  },

  getIntensityAngle: function(msrment) {
    // only take inner ring for now
    var innerRing = _.first(msrment.lightIntensities, 8);
    var angle;
    var vectors = _.map(innerRing, function(intensity, idx) {
      angle = (Math.PI * idx) / 4;
      return {
        x: intensity * Math.cos(angle),
        y: intensity * Math.sin(angle),
      };
    });
    console.log(vectors);
    var vectorSum = _.reduce(vectors, function(result, vec, key) {
      result.x += vec.x;
      result.y += vec.y;
      return result;
    }, {x: 0, y:0});
    return Math.atan(vectorSum.y/vectorSum.x);
  },

  getData: function() {
    // have some sensible filter defaults
    var filter = this.get('filter');
    return _.chain(this.get('measurements'))
      .map(function (msrment) {
        return {
          // convert to millis
          x: moment(msrment.timestamp, 'X'),
          y: msrment.lightIntensity,
        };
      }).filter(function (msrment) {
        return msrment.x >= filter.start && msrment.x < moment(filter.end).add(1, 'days');
    }).value();
  },

});
