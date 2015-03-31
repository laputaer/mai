
/**
 * create-user.js
 *
 * Create local user given oauth profile data
 */

module.exports = createUser;

/**
 * Create local user
 *
 * @return  Object
 */
function *createUser() {
	var oauth = this.user.oauth;
	var local = this.user.local;
	var db = this.db;

	if (local) {
		return local;
	}

	var User = db.col('users');
	try {
		oauth.timestamp = new Date();
		yield User.insert(oauth);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	return yield User.findOne({
		uid: oauth.uid
	});
};
