
/**
 * match-app-name.js
 *
 * Match app name
 */

module.exports = matchAppPassword;

/**
 * Match an app profile
 *
 * @param   Object  opts  Options { db, user, name }
 * @return  Object        Profile
 */
function *matchAppPassword(opts) {
	var db = opts.db;
	var App = db.col('apps');

	return yield App.findOne({
		user: opts.user
		, name: opts.name
	});
};
