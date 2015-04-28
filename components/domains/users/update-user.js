
/**
 * update-user.js
 *
 * Update local user given profile data
 */

module.exports = updateUser;

/**
 * Update and return local user
 *
 * @param   Object  opts  Options { db, profile }
 * @return  Object        User local profile
 */
function *updateUser(opts) {
	var db = opts.db;
	var User = db.col('users');

	var profile = {
		name: opts.profile.name
		, login: opts.profile.login
		, avatar: opts.profile.avatar
		, updated: new Date()
	};

	// may throw error
	yield User.update({
		uid: opts.profile.uid
	}, profile);

	// null if user not found
	return yield User.findOne({
		uid: opts.profile.uid
	});
};
