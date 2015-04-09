
/**
 * match-club.js
 *
 * Match local club by slug
 */

module.exports = matchClub;

/**
 * Match local club
 *
 * @return  Mixed
 */
function *matchClub() {
	var body = this.state.input;
	var db = this.db;
	var Club = db.col('clubs');

	return yield Club.findOne({
		slug: body.slug
	});
};
