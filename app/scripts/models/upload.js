var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  niceCreated: function() {
    return moment(this.get('created')).format('llll');
  },

  // function prettyLocation(resp) {
  //   var loc = resp.results.locations[0];
  //   return loc.street + ', ' + loc.adminArea5 + ', ' + loc.adminArea3;
  // },

  toDisplay: function() {
    return _.extend(this.toJSON(), {
      created: this.niceCreated(),
      url: this.url(),
    });
  },

});
