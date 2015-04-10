
/**
 * find-club.js
 *
 * Match local club by slug
 */

module.exports = findClub;

/**
 * Match local club
 *
 * @return  Mixed
 */
function *findClub() {
	var slug = this.params.slug;
	var db = this.db;
	var Club = db.col('clubs');

	return yield Club.findOne({
		slug: slug
	});
};
