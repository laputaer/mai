
/**
 * get-recent-clubs.js
 *
 * Find recent clubs
 */

module.exports = getRecentClubs;

/**
 * Find clubs by point counts, order by create date
 *
 * @param   Object  opts  Options { db, points, limit, skip }
 * @return  Array         A list of clubs
 */
function *getRecentClubs(opts) {
	var db = opts.db;
	var points = opts.points;
	var limit = opts.limit;
	var skip = opts.skip;

	var Club = db.col('clubs');

	var query = {
		points: {
			'$gte': points
		}
	};

	// STEP 1: find clubs
	var clubs = yield Club.find(query).sort({ created: -1 }).limit(limit).skip(skip);

	return clubs;
};
