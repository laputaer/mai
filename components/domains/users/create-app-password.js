
/**
 * create-app-password.js
 *
 * Generate an app password and store it in user profile
 */

var cuid = require('cuid');
var crypto = require('crypto');
var bcrypt = require('bcrypt-then');

module.exports = createAppPassword;

/**
 * Create an app password
 *
 * @param   Object  opts  Options { db, user, name }
 * @return  String        Password
 */
function *createAppPassword(opts) {
	var db = opts.db;
	var user = opts.user;
	var name = opts.name;
	var App = db.col('apps');

	// step 1: generate password
	var pass = crypto.randomBytes(8).toString('hex');
	
	// step 2: hash it
	var hash = yield bcrypt.hash(pass, 12);

	// step 3: app profile
	var profile = {
		aid: cuid()
		, user: user
		, hash: hash
		, name: name
		, created: new Date()
		, updated: new Date()
	};

	// step 4: create app password
	yield App.insert(profile);

	return pass;
};
