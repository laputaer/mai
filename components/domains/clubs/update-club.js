
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
		, intro: data.intro
		, logo: data.logo
		, updated: new Date()
	}

	if (data.slug !== slug) {
		club.slug = data.slug
	}

	yield Club.update({
		slug: slug
	}, club);

	// STEP 2: return new club data
	return yield Club.findOne({
		slug: club.slug || slug
	});
};
