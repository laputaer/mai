
/**
 * find-user.js
 *
 * Match local user by uid
 */

module.exports = findUser;

/**
 * Find user
 *
 * @return  Object
 */
function *findUser() {
	var uid = this.session.uid;
	var db = this.db;
	var User = db.col('users');

	return yield User.findOne({
		uid: uid
	});
};
