
/**
 * login-user.js
 *
 * Upgrade guest session into user session, populate cache
 */

module.exports = loginUser;

/**
 * Login user
 *
 * @param   Object  opts  Options { config, session, cache, profile }
 * @return  Void
 */
function *loginUser(opts) {
	var session = opts.session;
	var cache = opts.cache;
	var config = opts.config;

	// cookie session
	session.uid = opts.profile.uid;
	session.last_seen = Date.now().toString();

	// TODO: centralized data validation (error bubble to client)
	var profile = {
		name: opts.profile.name
		, login: opts.profile.login
		, avatar: opts.profile.avatar
		, uid: opts.profile.uid
		, last_seen: Date.now().toString()
	};

	// cache update, may throw error
	yield cache.hmset('users:' + profile.uid, profile);
	yield cache.expire('users:' + profile.uid, config.session.maxAge);
};
