
/**
 * remove-app-password.js
 *
 * Remove an app password profile
 */

module.exports = removeAppPassword;

/**
 * Remove an app profile
 *
 * @param   Object  opts  Options { db, aid }
 * @return  Void
 */
function *removeAppPassword(opts) {
	var db = opts.db;
	var aid = opts.aid;

	var App = db.col('apps');

	// STEP 1: remove app profile
	yield App.remove({
		aid: aid
	});
};
