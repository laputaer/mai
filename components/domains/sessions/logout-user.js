
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

	// guest session, ignore
	if (!session.uid) {
		return;
	}

	// cookie session
	delete session.uid;
	session.last_seen = Date.now().toString();

	// cache update, may throw error
	yield cache.hset('users:' + uid, 'last_seen', Date.now().toString());
	yield cache.expire('users:' + uid, config.session.maxAge);
};
