
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

	var clubs = yield Club.find().sort({ members: -1 }).limit(50);

	return clubs;
};
