var app = app || {};

(function() {
  app.UserView = Backbone.View.extend({
    tagName: 'a',
    className: 'list-group-item',

    events: {
      'click a.delete': 'delete',
    },

    // Cache the template function for a single item.
    template: _.template($('#user-template').html()),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    delete: function(e) {
      this.model.destroy();
    },

    render: function () {
      this.$el.html(this.template(this.model.toDisplay()));
      return this;
    },

  });
})();
