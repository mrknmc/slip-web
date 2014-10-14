var app = app || {};

(function() {
  app.UploadView = Backbone.View.extend({
    //... is a list tag.
    tagName: 'tr',

    // Cache the template function for a single item.
    template: _.template($('#upload-template').html()),

    // The DOM events specific to an item.
    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.model, 'destroy', this.remove);
      // this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    // Re-render the titles of the todo item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

  });
})();
