var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  // Cache the template function for a single item.
  template: _.template($('#map-template').html()),

  render: function () {
    L.mapbox.accessToken = 'pk.eyJ1IjoibXJrbm1jIiwiYSI6InpzeDluYTQifQ.ZXgkIs8pKSdBN8tSYF2iUQ';
    var map = L.mapbox.map('map', 'examples.map-20v6611k');
    var myLayer = L.mapbox.featureLayer().addTo(map);
    var features = [];

    for (var x = -120; x < 120; x += 20) {
        for (var y = -80; y < 80; y += 10) {
            features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [x, y]
                },
                properties: {
                    'marker-color': '#000',
                    'marker-symbol': 'star-stroked',
                    title: [x, y].join(',')
                }
            });
        }
    }

    myLayer.setGeoJSON({
        type: 'FeatureCollection',
        features: features
    });

    map.on('move', function() {
        // Construct an empty list to fill with onscreen markers.
        var inBounds = [],
        // Get the map bounds - the top-left and bottom-right locations.
            bounds = map.getBounds();

        // For each marker, consider whether it is currently visible by comparing
        // with the current map bounds.
        myLayer.eachLayer(function(marker) {
            if (bounds.contains(marker.getLatLng())) {
                inBounds.push(marker.options.title);
            }
        });

        // Display a list of markers.
        document.getElementById('coordinates').innerHTML = inBounds.join('\n');
    });

    map.setView([37, -77], 5);
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
