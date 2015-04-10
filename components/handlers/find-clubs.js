
/**
 * find-clubs.js
 *
 * Find clubs by user uid
 */

module.exports = findClubs;

/**
 * Find club
 *
 * @return  Object
 */
function *findClubs() {
	var db = this.db;
	var Club = db.col('clubs');
	return yield Club.find({
		owner: this.session.uid
	});
};
