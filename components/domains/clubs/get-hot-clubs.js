
/**
 * get-hot-clubs.js
 *
 * Find hot clubs
 */

module.exports = getHotClubs;

/**
 * Find clubs by member and point counts, filter by create date and order by update date
 *
 * @param   Object  opts  Options { db, members, points, created, limit, skip }
 * @return  Array         A list of clubs
 */
function *getHotClubs(opts) {
	var db = opts.db;
	var members = opts.members;
	var points = opts.points;
	var created = opts.created;
	var limit = opts.limit;
	var skip = opts.skip;

	var Club = db.col('clubs');

	var query = {
		members: {
			'$gte': members
		}
		, points: {
			'$gte': points
		}
		, created: {
			'$gte': created
		}
	};

	// STEP 1: find clubs
	var clubs = yield Club.find(query).sort({ updated: -1 }).limit(limit).skip(skip);

	return clubs;
};
