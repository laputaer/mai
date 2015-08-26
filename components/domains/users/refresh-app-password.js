
/**
 * refresh-app-password.js
 *
 * Recreate an app profile
 */

var crypto = require('crypto');
var bcrypt = require('bcrypt-then');

module.exports = refreshAppPassword;

/**
 * Refresh a deleted app profile
 *
 * @param   Object  opts  Options { db, aid }
 * @return  Object        App password profile
 */
function *refreshAppPassword(opts) {
	var db = opts.db;
	var aid = opts.aid;
	var App = db.col('apps');

	// STEP 1: generate password
	var pass = crypto.randomBytes(8).toString('hex');
	
	// STEP 2: hash it
	var hash = yield bcrypt.hash(pass, 12);

	// STEP 3: update app profile
	yield App.update({
		aid: aid
	}, {
		deleted: false
		, hash: hash
		, created: new Date()
		, updated: new Date()
	});

	// STEP 4: get new profile
	profile = yield App.findOne({
		aid: aid
	});

	// STEP 5: append password and remove hash
	profile.pass = pass;
	delete profile.hash;

	return profile;
};
