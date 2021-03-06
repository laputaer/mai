
/**
 * remove-app-password.js
 *
 * Soft delete an app password profile
 */

module.exports = removeAppPassword;

/**
 * Soft delete an app profile
 *
 * @param   Object  opts  Options { db, aid }
 * @return  Void
 */
function *removeAppPassword(opts) {
	var db = opts.db;
	var aid = opts.aid;

	var App = db.col('apps');

	yield App.update({
		aid: aid
	}, {
		deleted: true
		, updated: new Date()
	});
};
