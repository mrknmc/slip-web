var url = require('url');
var redis = require('redis');

var redisURL = url.parse(process.env.REDISCLOUD_URL);
var redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
redisClient.auth(redisURL.auth.split(':')[1]);

exports.module = redisClient;
