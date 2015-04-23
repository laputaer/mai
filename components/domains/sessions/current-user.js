
/**
 * current-user.js
 *
 * Get current user cache
 */

module.exports = currentUser;

/**
 * Current user
 *
 * @param   Object  opts  Options { session, cache }
 * @return  Object        User cache
 */
function *currentUser(opts) {
	var session = opts.session;
	var cache = opts.cache;

	// guest session, ignore
	if (!session.uid) {
		return;
	}

	// get cache, may throw error
	return yield cache.hgetall('users:' + session.uid);
};
