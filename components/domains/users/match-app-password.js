
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
 * @param   Object  opts  Options { db, password, aid }
 * @return  Object        App profile
 */
function *matchAppPassword(opts) {
	var db = opts.db;
	var aid = opts.aid;
	var password = opts.password;
	var App = db.col('apps');

	var profile = yield App.findOne({
		aid: aid
	});

	if (!profile) {
		return null;
	}

	if (profile.deleted) {
		return null;
	}

	var valid = yield bcrypt.compare(password, profile.hash);

	if (!valid) {
		return null;
	}

	return profile;
};
