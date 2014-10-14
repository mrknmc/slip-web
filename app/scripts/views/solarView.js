var app = app || {};

(function(Chartist) {
  app.SolarView = Backbone.View.extend({
    className: 'solar',

    options: {showArea: true, low: 0},

    // Cache the template function for a single item.
    template: _.template($('#solar-template').html()),

    initialize: function () {
      // this.$chart = this.$('.ct-chart');
      // this.$title = this.$('.title.item');
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      if (this.chart) {
        this.chart.refresh();
      } else {
        this.$el.html(this.template(this.model.toJSON()));
        this.chart = Chartist.Line(this.$('.ct-chart')[0], {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          series: [
            [12, 9, 7, 8, 5]
          ]
        }, this.options);
        console.log('wat');
      }
      console.log(this.chart);
      return this;
    },

  });
})(Chartist);
