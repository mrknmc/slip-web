var app = app || {};

(function () {
  'use strict';

  app.Solar = Backbone.Model.extend({
    defaults: {
      yAxis: {
        title: 'Light Intensity',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
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
      filter: {
        start: moment().add(-7, 'days'),
        end: moment(),
      },
    },

    title: function() {
      return {text: this.get('_id') + ': Solar Power'};
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
          // console.log(filter.start.format());
          // console.log(msrment.x.format());
          // console.log(filter.end.format());
          // console.log('==========');
          return msrment.x >= filter.start && msrment.x < filter.end.clone().add(1, 'days');
      }).value();
    },

  });
})(moment);
