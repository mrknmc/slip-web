var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  tagName: 'a',
  className: 'list-group-item',

  // Cache the template function for a single item.
  template: _.template($('#device-template').html()),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
