
/**
 * update-user.js
 *
 * Sync local user with oauth profile changes
 */

module.exports = updateUser;

/**
 * Update local user
 *
 * @return  Object
 */
function *updateUser() {
	var oauth = this.user.oauth;
	var local = this.user.local;
	var db = this.db;

	// update user
	var User = db.col('users');
	try {
		yield User.update({
			uid: local.uid
		}, {
			name: oauth.name
			, login: oauth.login
			, avatar: oauth.avatar
			, updated: new Date()
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	return yield User.findOne({
		uid: local.uid
	});
};
