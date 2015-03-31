
/**
 * login-user.js
 *
 * Login user via session
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

	if (!local) {
		delete this.session.id;
		return false;
	}

	this.session.id = local.uid;
	return true;
};
