var _ = require('lodash');


exports.intensitySum = function(msrment) {
  return _.reduce(msrment.lightIntensities, function(sum, num) {
    return sum + num;
  });
};

exports.intensityAngle = function(msrment) {
  // only take inner ring for now
  var innerRing = _.first(msrment.lightIntensities, 8);
  var angle;
  var vectors = _.map(innerRing, function(intensity, idx) {
    angle = (Math.PI * idx) / 4;
    return {
      x: intensity * Math.cos(angle),
      y: intensity * Math.sin(angle),
    };
  });
  console.log(vectors);
  var vectorSum = _.reduce(vectors, function(result, vec, key) {
    result.x += vec.x;
    result.y += vec.y;
    return result;
  }, {x: 0, y:0});
  return Math.atan(vectorSum.y/vectorSum.x);
};
