
/**
 * get-recently-updated-clubs.js
 *
 * Get clubs sort by updated date
 */

module.exports = getRecentlyUpdatedClubs;

/**
 * Sort club by member count
 *
 * @param   Object  opts  Options { db }
 * @return  Array         A list of clubs
 */
function *getRecentlyUpdatedClubs(opts) {
	var db = opts.db;
	var Club = db.col('clubs');

	var clubs = yield Club.find().sort({ updated: -1 }).limit(15);

	return clubs;
};
