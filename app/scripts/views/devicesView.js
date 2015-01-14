var Backbone = require('backbone');
var _ = require('lodash');
var util = require('../util');
var DeviceView = require('./deviceView');
var Device =  require('../models/device');
var devices = require('../collections/devices');
var uploads = require('../collections/uploads');


var Devices = Backbone.Collection.extend({
  model: Device,
});


module.exports = Backbone.View.extend({
  el: '#devices',

  initialize: function () {
    this.$list = this.$('.list-group');
    // this.listenTo(devices, 'add', this.addOne);
    this.listenTo(uploads, 'sync', this.render);
    // uploads.fetch();
  },

  addOne: function (device) {
    var view = new DeviceView({model: device});
    this.$list.append(view.render().el);
  },

  addAll: function (devices) {
    this.$list.html('');
    devices.each(this.addOne, this);
  },

  render: function (uploads) {
    // group by device ids
    var lol = uploads.groupBy('deviceId');
    var devices = _.map(lol, function(ups, deviceId, list) {
      var deviceAttrs = _(ups)
        // map list of intensities into 8-dimensional vector
        .map(function(up) {
          return {
            'xCoord': up.get('xCoord'),
            'yCoord': up.get('yCoord'),
            'solarTotal': util.intensities(up.get('solar')),
            'windSpeedTotal': util.windSpeeds(up.get('wind')),
            'minSolarTimestamp': util.minTimestamp(up.get('solar')).timestamp,
            'maxSolarTimestamp': util.maxTimestamp(up.get('solar')).timestamp,
            'minWindTimestamp': util.maxTimestamp(up.get('wind')).timestamp,
            'maxWindTimestamp': util.minTimestamp(up.get('wind')).timestamp,
          };
        })
        // sum up column-wise for all uploads
        .reduce(function(device, obj, key) {
          var i;
          for (i = obj.solarTotal.length - 1; i >= 0; i--) {
            device.solarTotal[i] += obj.solarTotal[i];
          }
          for (i = obj.windSpeedTotal.length - 1; i >= 0; i--) {
            device.windSpeedTotal[i] += obj.windSpeedTotal[i];
          }
          // SORRY
          console.log(obj.minSolarTimestamp);
          device.minSolarTimestamp = Math.min(device.minSolarTimestamp, obj.minSolarTimestamp);
          device.maxSolarTimestamp = Math.max(device.maxSolarTimestamp, obj.maxSolarTimestamp);
          device.minWindTimestamp = Math.min(device.minWindTimestamp, obj.minWindTimestamp);
          device.maxWindTimestamp = Math.max(device.maxWindTimestamp, obj.maxWindTimestamp);
          device.coords.push([obj.xCoord, obj.yCoord]);
          return device;
        }, {
          'solarTotal': [0, 0, 0, 0, 0, 0, 0, 0],
          'windSpeedTotal': [0, 0, 0, 0, 0, 0, 0, 0],
          'coords': [],
          'minSolarTimestamp': 100000000000000000000000,
          'maxSolarTimestamp': 0,
          'minWindTimestamp': 100000000000000000000000,
          'maxWindTimestamp': 0,
        });
      return new Device(_.assign(deviceAttrs, { '_id': deviceId }));
    });
    devices = new Devices(devices);
    this.addAll(devices);
  },

});
