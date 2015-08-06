
/**
 * match-user.js
 *
 * Match local user by uid
 */

module.exports = matchUser;

/**
 * Match local user
 *
 * @param   Object  opts  Options { db, uid }
 * @return  Object        User local profile
 */
function *matchUser(opts) {
	var db = opts.db;
	var User = db.col('users');

	return yield User.findOne({
		uid: opts.uid
	});
};
