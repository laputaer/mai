
/**
 * get-clubs-by-ids.js
 *
 * Get clubs given slugs, return result using order specified
 */

module.exports = getClubsByIds;

/**
 * Get clubs given slugs
 *
 * @param   Object  opts  Options { db, slugs }
 * @return  Object        Keyed output
 */
function *getClubsByIds(opts) {
	var db = opts.db;
	var slugs = opts.slugs;
	var Club = db.col('clubs');

	var clubs = yield Club.where('slug').in(slugs);
	var output = {};

	clubs.forEach(function (club) {
		output[club.slug] = club;
	});

	return output;
};
