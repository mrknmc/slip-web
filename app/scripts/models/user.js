var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  niceCreated: function() {
    return moment(this.get('created')).format('llll');
  },

  toDisplay: function() {
    return _.extend(this.toJSON(), {
      created: this.niceCreated(),
      url: this.url(),
    });
  },

});
