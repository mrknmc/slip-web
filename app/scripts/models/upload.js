var app = app || {};

(function (moment) {
  'use strict';

  app.Upload = Backbone.Model.extend({
    niceCreated: function() {
      return moment(this.get('created')).format('llll');
    },

    toDisplay: function() {
      return _.extend(this.toJSON(), {created: this.niceCreated()});
    },

  });
})(moment);
