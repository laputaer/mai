
/**
 * get-user-apps.js
 *
 * Find apps related to a user
 */

module.exports = getUserApps;

/**
 * Find app profiles by user id
 *
 * @param   Object  opts  Options { db, user, limit, skip, active }
 * @return  Array         A list of app profiles
 */
function *getUserApps(opts) {
	var db = opts.db;
	var user = opts.user;
	var limit = opts.limit;
	var skip = opts.skip;
	var active = opts.active;

	var App = db.col('apps');

	var query = {
		user: user
	};

	if (active) {
		query.deleted = {
			'$ne': true
		};
	}

	var apps = yield App.find(query).sort({ created: -1 }).limit(limit).skip(skip);

	return apps ? apps : [];
};
