var Backbone = require('backbone');
var DeviceView = require('./deviceView');
var devices = require('../collections/devices');

module.exports = Backbone.View.extend({
  el: '#devices',

  initialize: function () {
    this.$list = this.$('.list-group');
    this.listenTo(devices, 'add', this.addOne);
    devices.fetch();
  },

  addOne: function (user) {
    var view = new DeviceView({model: user});
    this.$list.append(view.render().el);
  },

  addAll: function (collection) {
    this.$list.html('');
    collection.each(this.addOne, this);
  },

  render: function (collection) {
    this.addAll(collection);
  },

});
