
/**
 * match-user.js
 *
 * Match local user by uid
 */

module.exports = matchUser;

/**
 * Match local user
 *
 * @return  Object
 */
function *matchUser() {
	var oauth = this.user.oauth;
	var db = this.db;

	if (!oauth) {
		return;
	}

	var User = db.col('users');

	return yield User.findOne({
		uid: oauth.uid
	});
};
