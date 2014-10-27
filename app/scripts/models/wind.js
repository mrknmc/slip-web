var app = app || {};

(function (moment) {
  'use strict';

  app.Wind = Backbone.Model.extend({
    defaults: {
      yAxis: {
        title: 'Wind Speed',
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
      return {text: this.get('_id') + ': Wind Speed'};
    },

    getData: function() {
      var filter = this.get('filter');
      return _.chain(this.get('measurements'))
        .map(function (msrment) {
          return {
            // convert to millis
            x: new Date(msrment.timestamp * 1000),
            y: msrment.windSpeed,
          };
        }).filter(function (msrment) {
          return msrment.x >= filter.start && msrment.x <= filter.end;
      }).value();
    },

  });
})(moment);
