
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
	var db = this.db;

	// new user
	var User = db.col('users');
	try {
		oauth.action_point = 5;
		oauth.action_base = 15;
		oauth.created = new Date();
		oauth.updated = new Date();
		yield User.insert(oauth);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	return yield User.findOne({
		uid: oauth.uid
	});
};
