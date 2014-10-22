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
        chart: {type: 'areaspline'},
        credit: {enabled: false},
        title: model.title(),
        xAxis: model.get('xAxis'),
        yAxis: model.get('yAxis'),
        plotOptions: model.get('plotOptions'),
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
