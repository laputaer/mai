
/**
 * get-ranked-clubs.js
 *
 * Get clubs sort by member count
 */

module.exports = getRankedClubs;

/**
 * Sort club by member count
 *
 * @param   Object  opts  Options { db }
 * @return  Array         A list of clubs
 */
function *getRankedClubs(opts) {
	var db = opts.db;
	var Club = db.col('clubs');

	var clubs = yield Club.find().sort({ points: -1 }).limit(15);

	return clubs;
};
