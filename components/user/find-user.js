
/**
 * find-user.js
 *
 * Match local user by uid
 */

var validator = require('validator');

module.exports = findUser;

/**
 * Find local user
 *
 * @return  Object
 */
function *findUser() {
	var pid = this.params.pid;
	var db = this.db;

	// uid missing or invalid
	if (!pid || !validator.isAlphanumeric(pid)) {
		return;
	}

	// build uid from pid
	var provider = pid.substr(0, 1);
	if (provider === 'g') {
		provider = 'github_';
	} else if (provider === 't') {
		provider = 'twitter_';
	}
	var uid = provider + pid.substr(1);

	var User = db.col('users');
	var data;
	try {
		data = yield User.findOne({ uid: uid });
	} catch(err) {
		this.app.emit('error', err, this);
		return;
	}

	return data;
};
