
/**
 * match-app-password.js
 *
 * Match app name and password
 */

var bcrypt = require('bcrypt-then');

module.exports = matchAppPassword;

/**
 * Match an app profile
 *
 * @param   Object   opts  Options { db, user, pass, name }
 * @return  Boolean
 */
function *matchAppPassword(opts) {
	var db = opts.db;
	var App = db.col('apps');

	var profile = yield App.findOne({
		user: opts.user
		, name: opts.name
	});

	if (!profile) {
		return false;
	}

	if (profile.deleted) {
		return false;
	}

	return yield bcrypt.compare(opts.pass, profile.hash);
};
