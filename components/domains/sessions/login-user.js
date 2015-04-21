
/**
 * login-user.js
 *
 * Upgrade guest session to user session
 */

module.exports = loginUser;

/**
 * Login user
 *
 * @return  Boolean
 */
function *loginUser() {
	var local = this.user.local;
	var cache = this.cache;

	// cookie session
	this.session.uid = local.uid;
	this.session.ts = Date.now();

	// cache store
	var data = {
		id: local.id
		, provider: local.provider
		, uid: local.uid
		, login: local.login
		, name: local.name
		, avatar: local.avatar
	};

	var result = true;
	try {
		yield cache.set('users:' + local.uid, JSON.stringify(data));
		yield cache.pexpire('users:' + local.uid, this.config.session.maxAge);
	} catch(err) {
		result = false;
		this.app.emit('error', err, this);
	}

	return result;
};
