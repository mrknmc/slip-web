var _ = require('lodash');


function innerRing(msrment) {
  // takes first 8 values
  return _(msrment.values).rest(16).first(8).value();
}


function middleRing(msrment) {
  // takes values 8-16
  return _(msrment.values).rest(8).first(8).value();
}


function outerRing(msrment) {
  // takes values 16-24
  return _.first(msrment.values, 8);
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
* Return max along each ring.
*/
function ringIntensities(msrments) {
  return _.map(msrments, function(m) {
    var inRing = _.max(innerRing(m));
    var midRing = _.max(middleRing(m));
    var outRing = _.max(outerRing(m));
    return {
      values: [inRing, midRing, outRing],
      timestamp: m.timestamp,
    }
  });
}


/**
* Computes windSpeeds into a vector of 8 directions.
*/
function windSpeeds(msrments) {
  var total = _.reduce(msrments, function(total, m, key) {
    // TODO: remove this if statement after receiving normal data
    if (m.windDirection < 8) {
    total.result[m.windDirection] += m.windSpeed;
    total.count[m.windDirection] += 1;
    } else {
      console.log(m.windDirection);
    }
    return total;
  }, {
    result: [0, 0, 0, 0, 0, 0, 0, 0],
    count: [0, 0, 0, 0, 0, 0, 0, 0],
  });
  return _.map(total.result, function(res, idx) {
    if (res === 0) {
      return 0;
    }
    return res / total.count[idx];
  });
}


/**
* Computes intensities into a vector of 8 directions.
*/
function intensities(msrments) {
  var total = _(msrments)
    // map over rings
    .map(function(m) {
      var inRing = innerRing(m);
      var midRing = middleRing(m);
      var outRing = outerRing(m);
      return _.zip(inRing, midRing, outRing)
        .map(function(vals) {
          // computes sum
          return _.max(vals);
      });
    // sum across all directions
    }).reduce(function(total, vec, key) {
      for (var i = vec.length - 1; i >= 0; i--) {
        total.result[i] += vec[i];
      }
      total.count += 1;
      return total;
    }, {
      result: [0, 0, 0, 0, 0, 0, 0, 0],
      count: 0,
    });
    return _.map(total.result, function(res) {
      return res / total.count;
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
exports.ringIntensities = ringIntensities;
exports.intensities = intensities;
exports.windSpeeds = windSpeeds;
exports.orientations = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
exports.maxTimestamp = maxTimestamp;
exports.minTimestamp = minTimestamp;
