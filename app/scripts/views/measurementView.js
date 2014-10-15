var app = app || {};

(function() {
  app.MeasurementView = Backbone.View.extend({

    options: {
      showArea: true,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(timestamp) {
          return moment.unix(timestamp, 'X').format('dddd');
        }
      },
    },

    // Cache the template function for a single item.
    template: _.template($('#chart-template').html()),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      if (this.chart) {
        // if not first time, then just update
        this.chart.redraw();
      } else {
        // if first time then render
        this.$el.html(this.template(this.model.toJSON()));
        this.$('.ui.dropdown').dropdown();
        var model = this.model.toJSON();
        this.$el.highcharts({
          chart: {type: 'area'},
          title: {text: model._id + ': Light Intensity',},
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date',
            },
          },
          yAxis: {
            title: {
              text: 'Light Intensity'
            }
          },
          plotOptions: {
            area: {
              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                  hover: {
                      enabled: true
                  }
                }
              }
            }
          },
          series: [{
            name: model._id,
            data: _.map(model.measurements, function(msrment) {
              return {
                // convert to millis
                x: new Date(msrment.timestamp * 1000),
                y: msrment.lightIntensity
              };
            }),
          }]
        });
        this.chart = this.$el.highcharts();
      }
      return this;
    },

  });
})();
