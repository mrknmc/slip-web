var Backbone = require('backbone');
var uploads = require('../collections/uploads');
var UploadView = require('./uploadView');

module.exports = Backbone.View.extend({
  el: '#uploads',

  initialize: function () {
    this.$tbody = this.$('tbody');
    this.listenTo(uploads, 'sync', this.render);
    uploads.fetch();
  },

  addOne: function (upload) {
    var view = new UploadView({model: upload});
    this.$tbody.append(view.render().el);
  },

  addAll: function (collection) {
    this.$tbody.html('');
    collection.each(this.addOne, this);
  },

  render: function (collection) {
    this.addAll(collection);
  },

});
