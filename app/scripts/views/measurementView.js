var app = app || {};

(function(Chartist, moment) {
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
        this.chart.update();
      } else {
        // if first time then render
        this.$el.html(this.template(this.model.toJSON()));
        this.$('.ui.dropdown').dropdown();
        this.chart = Chartist.Line(this.$('.ct-chart')[0], {
          labels: [1413321826, 1413321828, 1413321838, 1413321848, 1413321858, 1413321868, 1413321878],
          series: [
            [5, 6, 7, 4, 8, 9, 2, 3, 4, 5, 6, 4, 6, 3, 5, 6, 2, 3, 4, 5, 6, 7]
          ]
        }, this.options);
      }
      return this;
    },

  });
})(Chartist, moment);
