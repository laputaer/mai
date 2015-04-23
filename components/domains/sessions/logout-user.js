
/**
 * logout-user.js
 *
 * Downgrade user session into guest session, clear cache
 */

module.exports = logoutUser;

/**
 * Logout user
 *
 * @param   Object  opts  Options { config, session, cache }
 * @return  Void
 */
function *logoutUser(opts) {
	var session = opts.session;
	var cache = opts.cache;
	var config = opts.config;
	var uid = session.uid;
	var ts = Date.now().toString();

	// guest session, ignore
	if (!session.uid) {
		return;
	}

	// cookie session
	delete session.uid;
	session.last_seen = ts;

	// cache update, may throw error
	yield cache.hset('users:' + uid, 'last_seen', ts);
	yield cache.expire('users:' + uid, config.session.maxAge);
};
