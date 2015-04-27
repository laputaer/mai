
/**
 * verify-csrf-token.js
 *
 * Verify csrf token for input
 */

var csrf = require('csrf')();

module.exports = verifyCsrfToken;

/**
 * Take a CSRF token and verify it with session secret
 *
 * @param   Object   opts  Options { session, cache, token }
 * @return  Boolean        Result
 */
function *verifyCsrfToken(opts) {
	var session = opts.session;
	var cache = opts.cache;

	// guest session or missing token, ignore
	if (!session.uid || !opts.token) {
		return false;
	}

	// find existing secret
	var secret = yield cache.hget('users:' + session.uid, 'csrf_secret');
	if (!secret) {
		return false;
	}

	// verify token
	return csrf.verify(secret, opts.token);
};
