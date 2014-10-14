var app = app || {};

(function() {
  app.MeasurementsView = Backbone.View.extend({

    initialize: function () {
      this.listenTo(app.solar, 'sync', this.render);
      this.collection.fetch();
    },

    addOne: function (solar) {
      var view = new app.MeasurementView({model: solar});
      this.$el.append(view.render().el);
    },

    addAll: function (collection) {
      this.$el.html('');
      collection.each(this.addOne, this);
    },

    render: function (collection) {
      this.addAll(collection);
    },

  });
})();
