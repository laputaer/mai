
/**
 * get-users-by-ids.js
 *
 * Get users given uids, return result using order specified
 */

module.exports = getUsersByIds;

/**
 * Get users given uids
 *
 * @param   Object  opts  Options { db, uids }
 * @return  Object        Keyed output
 */
function *getUsersByIds(opts) {
	var db = opts.db;
	var uids = opts.uids;
	var User = db.col('users');

	var users = yield User.where('uid').in(uids);
	var output = [];

	users.forEach(function (user) {
		output[user.uid] = user;
	});

	return output;
};
