
/**
 * find-owner.js
 *
 * Match club owner by uid
 */

module.exports = findOwner;

/**
 * Find user
 *
 * @return  Object
 */
function *findOwner() {
	var owner = this.state.owner;
	var db = this.db;
	var User = db.col('users');

	return yield User.findOne({
		uid: owner
	});
};
