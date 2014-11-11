var request = require('request');
var redisClient = require('./redisClient');
var ONE_DAY = 86400;


exports.findByCoords = function (req, res) {
  var coords = req.query.xCoord + ',' + req.query.yCoord;

  redisClient.get(coords, function(err, reply) {
    if (reply !== null) {
      // coordinates were in Redis
      var address = JSON.parse(reply.toString());
      res.json(address);
    } else {
      // coordinates were not in Redis
      var url = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=' +
        process.env.MAPQUEST_KEY + '&location=' + coords;

      request.get({
          url: url,
          json: true,
        }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            redisClient.setex(coords, ONE_DAY, JSON.stringify(body));
            res.json(body);
          } else {
            res.status(418).json({'error': 'Could not retrieve coordinates from MapQuest.'});
          }
      });
    }
  });
};
