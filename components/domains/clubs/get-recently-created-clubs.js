
/**
 * get-recently-created-clubs.js
 *
 * Get clubs sort by creation date
 */

module.exports = getRecentlyCreatedClubs;

/**
 * Sort club by member count
 *
 * @param   Object  opts  Options { db }
 * @return  Array         A list of clubs
 */
function *getRecentlyCreatedClubs(opts) {
	var db = opts.db;
	var Club = db.col('clubs');

	var clubs = yield Club.find().sort({ created: -1 }).limit(15);

	return clubs;
};
