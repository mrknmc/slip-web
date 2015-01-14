var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  // Cache the template function for a single item.
  template: _.template($('#map-template').html()),

  setMapped: function(upload) {
    var x = upload.get('xCoord');
    var y = upload.get('yCoord');
    this.myLayer.setGeoJSON({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [y, x]
                },
                properties: {
                    'marker-color': '#000',
                    'marker-symbol': 'star-stroked',
                    title: [x, y].join(',')
                }
            }
        ]
    });

    this.map.setView([x, y], 15);
  },

  render: function () {
    this.$el.html(this.template());
    L.mapbox.accessToken = 'pk.eyJ1IjoibXJrbm1jIiwiYSI6InpzeDluYTQifQ.ZXgkIs8pKSdBN8tSYF2iUQ';
    var map = L.mapbox.map(this.$('#map')[0], 'examples.map-i86nkdio');
    this.$('#map-modal').on('shown.bs.modal', function () {
      map.invalidateSize();
    });
    this.myLayer = L.mapbox.featureLayer().addTo(map);
    this.map = map;
    return this;
  },
});
