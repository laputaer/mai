
/**
 * update-club.js
 *
 * Update a club given data
 */

module.exports = updateClub;

/**
 * Update and return a club
 *
 * @param   Object  opts  Options { db, data, slug }
 * @return  Object        Club data
 */
function *updateClub(opts) {
	var db = opts.db;
	var data = opts.data;
	var slug = opts.slug;
	var Club = db.col('clubs');

	// STEP 1: update club
	var club = {
		title: data.title
		, slug: data.slug
		, updated: new Date()
	}
	yield Club.update({
		slug: slug
	}, club);

	// null if club not found
	return yield Club.findOne({
		slug: club.slug
	});
};
