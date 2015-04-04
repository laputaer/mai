
/**
 * find-user.js
 *
 * Match local user by uid
 */

module.exports = matchUser;

/**
 * Find local user
 *
 * @return  Object
 */
function *matchUser() {
	var uid = this.session.uid;
	var redis = this.redis;

	// guest user
	if (!uid) {
		return;
	}

	var data = yield redis.get('users:' + uid);
	try {
		data = JSON.parse(data);
	} catch(err) {
		this.app.emit('error', err, this);
		return;
	}

	return data;
};
