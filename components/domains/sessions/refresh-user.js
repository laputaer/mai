
/**
 * refresh-user.js
 *
 * Refresh user session and cache
 */

module.exports = refreshUser;

/**
 * Refresh user
 *
 * @param   Object  opts  Options { config, session, cache }
 * @return  Object        User cache
 */
function *refreshUser(opts) {
	var session = opts.session;
	var cache = opts.cache;
	var config = opts.config;

	// guest session, ignore
	if (!session.uid) {
		return;
	}

	// cookie session
	session.last_seen = Date.now().toString();

	// cache update, may throw error
	yield cache.hset('users:' + session.uid, 'last_seen', Date.now().toString());
	yield cache.expire('users:' + session.uid, config.session.maxAge);

	// get cache, may throw error
	return yield cache.hgetall('users:' + session.uid);
};
