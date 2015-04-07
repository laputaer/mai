
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
	var redis = this.redis;

	// cookie session
	this.session.uid = local.uid;
	this.session.ts = Date.now();

	// redis store
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
		yield redis.set('users:' + local.uid, JSON.stringify(data));
		yield redis.pexpire('users:' + local.uid, this.config.session.maxAge);
	} catch(err) {
		result = false;
		this.app.emit('error', err, this);
	}

	return result;
};
