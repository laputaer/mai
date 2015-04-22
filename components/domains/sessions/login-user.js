
/**
 * login-user.js
 *
 * Upgrade guest session to user session
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
	session.ts = new Date();

	// TODO: centralized data validation (error bubble to client)
	var profile = {
		id: opts.profile.id
		, name: opts.profile.name
		, login: opts.profile.login
		, avatar: opts.profile.avatar
		, provider: opts.profile.provider
		, uid: opts.profile.uid
	};

	// cache update
	yield cache.set('users:' + profile.uid, JSON.stringify(profile));
	yield cache.pexpire('users:' + profile.uid, config.session.maxAge);
};
