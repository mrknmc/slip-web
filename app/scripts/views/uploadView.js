var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  tagName: 'tr',

  events: {
    'click a.delete': 'delete',
  },

  // Cache the template function for a single item.
  template: _.template($('#upload-template').html()),

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
