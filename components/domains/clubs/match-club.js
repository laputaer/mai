
/**
 * match-club.js
 *
 * Match club by slug
 */

module.exports = matchClub;

/**
 * Match local user
 *
 * @param   Object  opts  Options { db, slug }
 * @return  Object        Club data
 */
function *matchClub(opts) {
	var db = opts.db;
	var Club = db.col('clubs');

	return yield Club.findOne({
		slug: opts.slug
	});
};
