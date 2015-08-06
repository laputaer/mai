
/**
 * create-user.js
 *
 * Create local user given profile data
 */

module.exports = createUser;

/**
 * Create and return local user
 *
 * @param   Object  opts  Options { db, profile }
 * @return  Object        User local profile
 */
function *createUser(opts) {
	var db = opts.db;
	var User = db.col('users');

	var profile = {
		id: opts.profile.id
		, name: opts.profile.name
		, login: opts.profile.login
		, avatar: opts.profile.avatar
		, provider: opts.profile.provider
		, uid: opts.profile.uid
		, action_point: 20
		, action_base: 20
		, fav_count: 0
		, fav_point: 0
		, created: new Date()
		, updated: new Date()
	};

	yield User.insert(profile);

	return yield User.findOne({
		uid: profile.uid
	});
};
