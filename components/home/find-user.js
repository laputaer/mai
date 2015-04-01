
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
	var uid = this.session.id;
	var db = this.db;

	if (!uid) {
		return;
	}

	var User = db.col('users');

	return yield User.findOne({
		uid: uid
	});
};
