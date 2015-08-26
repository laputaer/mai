
/**
 * create-app-token.js
 *
 * Generate an app token and store it in cache
 */

var crypto = require('crypto');

module.exports = createAppToken;

/**
 * Create an app token
 *
 * @param   Object  opts  Options { cache, uid, aid }
 * @return  Object        App token profile
 */
function *createAppToken(opts) {
	var cache = opts.cache;
	var uid = opts.uid;
	var aid = opts.aid;

	// STEP 1: generate token
	var token = crypto.randomBytes(16).toString('hex');
	var expire = 60 * 60 * 24;
	var key = 'token:' + uid + ':' + aid;

	// STEP 2: store app token
	yield cache.set(key, token);
	yield cache.expire(key, expire);

	// STEP 3: output app token profile
	return {
		token: token
		, expire: expire
	};
};
