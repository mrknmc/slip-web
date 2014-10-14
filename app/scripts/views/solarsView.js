var app = app || {};

(function() {
  app.SolarsView = Backbone.View.extend({
    el: '#solar',

    initialize: function () {
      this.listenTo(app.solar, 'sync', this.render);
      app.solar.fetch();
    },

    addOne: function (solar) {
      var view = new app.SolarView({model: solar});
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
