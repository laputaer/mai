
/**
 * get-user-apps.js
 *
 * Find apps related to a user
 */

module.exports = getUserApps;

/**
 * Find app profiles by user id
 *
 * @param   Object  opts  Options { db, user, limit, skip }
 * @return  Array         A list of app profiles
 */
function *getUserApps(opts) {
	var db = opts.db;
	var user = opts.user;
	var limit = opts.limit;
	var skip = opts.skip;

	var App = db.col('apps');

	var query = {
		user: user
	};

	// STEP 1: find apps
	var apps = yield App.find(query).sort({ created: -1 }).limit(limit).skip(skip);

	return apps ? apps : [];
};
