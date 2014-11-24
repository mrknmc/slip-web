var _ = require('lodash');


function innerRing(msrment) {
  return _.first(msrment.values, 8);
}


function middleRing(msrment) {
  return _(msrment.values).rest(8).first(8).value();
}


function outerRing(msrment) {
  return _(msrment.values).rest(16).first(8).value();
}


function intensitySum(msrment) {
  return _.reduce(msrment.values, function(sum, num) {
    return sum + num;
  });
}


/**
* Returns measurement with the minimum timestamp
*/
function maxTimestamp(msrments) {
  return _.max(msrments, function(msrment) {
    return msrment.timestamp;
  });
}


/**
* Returns measurement with the minimum timestamp
*/
function minTimestamp(msrments) {
  return _.min(msrments, function(msrment) {
    return msrment.timestamp;
  });
}


/**
* Computes windSpeeds into a vector of 8 directions.
*/
function windSpeeds(msrments) {
  return _.reduce(msrments, function(result, m, key) {
    // TODO: remove this if statement after receiving normal data
    if (m.windDirection < 8) {
      result[m.windDirection] += m.windSpeed;
    }
    return result;
  }, [0, 0, 0, 0, 0, 0, 0, 0]);
}


/**
* Computes intensities into a vector of 8 directions.
*/
function intensities(msrments) {
  return _(msrments)
    // map over rings
    .map(function(m) {
      var inRing = innerRing(m);
      var midRing = middleRing(m);
      var outRing = outerRing(m);
      return _.zip(inRing, midRing, outRing)
        .map(function(vals) {
          // computes sum
          // TODO: maybe use max, not sure if sum make sense for summing watt/m^2
          return _.reduce(vals, function(sum, num) {
            return sum + num;
          });
      });
    }).reduce(function(result, vec, key) {
      for (var i = vec.length - 1; i >= 0; i--) {
        result[i] += vec[i];
      }
      return result;
  });
}


function intensityAngle(msrment) {
  // there are as many sectors as there are intensities
  // when length is 8, every sector is pi/4
  var intensities = msrment.values;
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
exports.intensities = intensities;
exports.windSpeeds = windSpeeds;
exports.orientations = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
exports.maxTimestamp = maxTimestamp;
exports.minTimestamp = minTimestamp;
