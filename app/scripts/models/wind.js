var Backbone = require('backbone');
var _ = require('lodash');
var moment = require('moment');
var util = require('../util');


module.exports = Backbone.Model.extend({
  defaults: function() {
    return {
      color: '#87cefa',
      yAxis: {
        title: 'Wind Speed',
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
    return {text: this.get('_id') + ': Wind Speed'};
  },

  intensities: function() {
    return [1,2,3,4,5,6,7,8];
  },
    // return _.map(this.get('measurements'), function(msrment) {
    //   var inRing = util.innerRing(msrment);
    //   var midRing = util.middleRing(msrment);
    //   var outRing = util.outerRing(msrment);
    //   return _.chain()
    //     .zip(inRing, midRing, outRing)
    //     .map(function(vals) {
    //       return _.reduce(vals, function(sum, num) {
    //         return sum + num;
    //       });
    //     })
    //     .value();
    // });
  // },

  getData: function() {
    var filter = this.get('filter');
    return _.chain(this.get('measurements'))
      .map(function (msrment) {
        return {
          // convert to millis
          x: moment(msrment.timestamp, 'X'),
          y: msrment.windSpeed,
        };
      }).filter(function (msrment) {
        return msrment.x >= filter.start && msrment.x <= filter.end;
    }).value();
  },

});
