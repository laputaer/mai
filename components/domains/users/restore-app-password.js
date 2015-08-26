
/**
 * restore-app-password.js
 *
 * Restore an app password profile
 */

module.exports = restoreAppPassword;

/**
 * Restore an app profile
 *
 * @param   Object  opts  Options { db, aid }
 * @return  Void
 */
function *restoreAppPassword(opts) {
	var db = opts.db;
	var aid = opts.aid;

	var App = db.col('apps');

	yield App.update({
		aid: aid
	}, {
		deleted: false
		, updated: new Date()
	});
};
