var Backbone = require('backbone');
var uploads = require('../collections/uploads');
var MapView = require('./mapView');
var UploadView = require('./uploadView');

module.exports = Backbone.View.extend({
  el: '#uploads',

  initialize: function () {
    this.$tbody = this.$('tbody');
    this.mapView = new MapView();
    this.listenTo(uploads, 'mapped', this.whatever);
    this.listenTo(uploads, 'sync', this.render);
    uploads.fetch();
  },

  whatever: function(upload) {
    console.log(upload);
    this.mapView.setMapped(upload);
  },

  addOne: function (upload) {
    var view = new UploadView({model: upload});
    this.$tbody.append(view.render().el);
  },

  addAll: function (collection) {
    this.$tbody.html('');
    collection.each(this.addOne, this);
    this.$tbody.append(this.mapView.render().el);
  },

  render: function (collection) {
    this.addAll(collection);
  },

});
