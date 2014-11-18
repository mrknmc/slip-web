var request = require('request');
var redisClient = require('./redisClient');
var ONE_DAY = 86400;


exports.findByCoords = function(req, res) {
  getLocation(req.query.xCoord, req.query.yCoord, function(err, loc) {
    if (loc) {
      res.json(loc);
    } else {
      res.status(418).json({'error': 'Could not retrieve coordinates from MapQuest.'});
    }
  });
};


function getLocation(xCoord, yCoord, callback) {
  var coords = xCoord + ',' + yCoord;

  redisClient.get(coords, function(err, reply) {
    if (reply !== null) {
      // coordinates were in Redis
      var address = JSON.parse(reply.toString());
      callback(null, address);
    } else {
      // coordinates were not in Redis
      var url = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=' +
        process.env.MAPQUEST_KEY + '&location=' + coords;

      request.get({
          url: url,
          json: true,
        }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            if (prettyLocation(body)) {
              // if pretty location exists store body
              redisClient.setex(coords, ONE_DAY, JSON.stringify(body));
              callback(null, body);
            } else {
              // otherwise print error
              if (body.messages) {
                if (body.messages.length > 0) {
                  callback(new Error(body.messages[0]), null);
                }
              } else {
                callback(new Error('Unspecified MapQuest Error.'), null);
              }
            }
          } else {
            callback(error, null);
          }
      });
    }
  });
}


function prettyLocation(data) {
  if (data.results.length > 0) {
    if (data.results[0].locations.length > 0) {
      var loc = data.results[0].locations[0];
      return loc.street + ', ' + loc.adminArea5 + ', ' + loc.adminArea3;
    }
  }
  return null;
}

exports.getLocation = getLocation;
exports.prettyLocation = prettyLocation;
