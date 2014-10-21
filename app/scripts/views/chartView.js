var app = app || {};

(function() {
  app.ChartView = Backbone.View.extend({

    // Cache the template function for a single item.
    template: _.template($('#chart-template').html()),

    render: function() {
      // if first time then render
      this.$el.html(this.template(this.model.toJSON()));
      this.$panelBody = this.$('.panel-body');
      var model = this.model;
      this.$panelBody.highcharts({
        chart: {type: 'area'},
        title: model.title(),
        xAxis: model.get('xAxis'),
        yAxis: model.get('yAxis'),
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
          name: model.get('_id'),
          data: model.getData(),
        }]
      });
      this.chart = this.$panelBody.highcharts();
      return this;
    },

  });
})();
