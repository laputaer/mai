
/**
 * redis.js
 *
 * A simple wrapper for redis driver
 */

var redis = require('then-redis');

var hasAttrs = require('../helpers/has-required-attributes');

module.exports = database;

/**
 * Return an instance of then-redis
 *
 * @return  Redis
 */
function *database() {
	var opts = this.config.redis;

	if (!hasAttrs(opts, ['server', 'port', 'database'])) {
		throw new Error('Missing required redis config');
	}

	var client = redis.createClient(opts);

	// prevent redis error from crashing our app
	client.on('error', function(err) {
		// you can log driver connection attempts here
	});

	// make sure we have active connection to redis
	yield client.select(opts.database);

	return client;
};
