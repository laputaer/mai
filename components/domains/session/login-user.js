
/**
 * login-user.js
 *
 * Upgrade guest session into user session, populate cache
 */

module.exports = loginUser;

/**
 * Login user
 *
 * @param   Object  opts  Options { config, session, cache, local, oauth }
 * @return  Void
 */
function *loginUser(opts) {
	var session = opts.session;
	var cache = opts.cache;
	var config = opts.config;
	var local = opts.local;
	var oauth = opts.oauth;
	var ts = Date.now().toString();

	// cookie session
	session.uid = local.uid;
	session.last_seen = ts;

	var profile = {
		name: local.name
		, login: local.login
		, avatar: local.avatar
		, uid: local.uid
		, provider: local.provider
		, id: local.id
		, access_token: oauth.access_token
		, access_secret: oauth.access_secret
		, last_seen: ts
	};

	// cache update, may throw error
	yield cache.hmset('users:' + profile.uid, profile);
	yield cache.pexpire('users:' + profile.uid, config.session.maxAge);
};
