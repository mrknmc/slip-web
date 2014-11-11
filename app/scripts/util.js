var _ = require('lodash');


function innerRing(msrment) {
  return _.first(msrment.lightIntensities, 8);
}


function middleRing(msrment) {
  return _(msrment.lightIntensities).rest(8).first(8).value();
}


function outerRing(msrment) {
  return _(msrment.lightIntensities).rest(16).first(8).value();
}


function intensitySum(msrment) {
  return _.reduce(msrment.lightIntensities, function(sum, num) {
    return sum + num;
  });
}


function intensityAngle(msrment) {
  // there are as many sectors as there are intensities
  // when length is 8, every sector is pi/4
  var intensities = msrment.lightIntensities;
  var sectorAngle = Math.PI * 2 / intensities.length;
  var angle;
  var vectors = _.map(intensities, function(intensity, idx) {
    angle = sectorAngle * idx;
    return {
      x: intensity * Math.cos(angle),
      y: intensity * Math.sin(angle),
    };
  });
  var vectorSum = _.reduce(vectors, function(result, vec, key) {
    result.x += vec.x;
    result.y += vec.y;
    return result;
  }, {x: 0, y:0});
  return Math.atan(vectorSum.y/vectorSum.x);
}


exports.innerRing = innerRing;
exports.middleRing = middleRing;
exports.outerRing = outerRing;
exports.intensitySum = intensitySum;
exports.intensityAngle = intensityAngle;
