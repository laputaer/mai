
/**
 * get-user-owned-clubs.js
 *
 * Find clubs created by a user
 */

module.exports = getUserOwnedClubs;

/**
 * Find clubs by owner uid
 *
 * @param   Object  opts  Options { db, uid }
 * @return  Array         A list of clubs
 */
function *getUserOwnedClubs(opts) {
	var db = opts.db;
	var Club = db.col('clubs');

	// null if club not found
	return yield Club.find({
		owner: opts.uid
	});
};
