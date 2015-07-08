
/**
 * get-csrf-token.js
 *
 * Generate csrf token for current session
 */

var csrf = require('csrf')();

module.exports = getCsrfToken;

/**
 * Create a csrf secret and put it in session store
 * then use it to generate new token
 *
 * @param   Object  opts  Options { session, cache }
 * @return  String        CSRF token
 */
function *getCsrfToken(opts) {
	var session = opts.session;
	var cache = opts.cache;

	// guest session, ignore
	if (!session.uid) {
		return null;
	}

	// find existing secret or generate new one
	var secret = yield cache.hget('users:' + session.uid, 'csrf_secret');
	if (!secret) {
		secret = yield csrf.secret();
		yield cache.hset('users:' + session.uid, 'csrf_secret', secret);
	}

	// generate new token
	var token = csrf.create(secret);
	return token;
};
