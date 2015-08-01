
/**
 * get-top-clubs.js
 *
 * Find top clubs
 */

module.exports = getTopClubs;

/**
 * Find clubs by member and point counts
 *
 * @param   Object  opts  Options { db, members, limit, skip }
 * @return  Array         A list of clubs
 */
function *getTopClubs(opts) {
	var db = opts.db;
	var members = opts.members;
	var limit = opts.limit;
	var skip = opts.skip;

	var Club = db.col('clubs');

	var query = {
		members: {
			'$gte': members
		}
	};

	// STEP 1: find clubs
	var clubs = yield Club.find(query).sort({ points: -1 }).limit(limit).skip(skip);

	return clubs;
};
