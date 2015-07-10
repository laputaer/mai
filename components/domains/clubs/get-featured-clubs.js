
/**
 * get-featured-clubs.js
 *
 * Get clubs given slugs, return result using order specified
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
	var slugs = opts.slugs;
	var Club = db.col('clubs');

	var clubs = yield Club.where('slug').in(slugs);
	var output = [];

	clubs.forEach(function (club) {
		var pos = slugs.indexOf(club.slug);
		output[pos] = club;
	});

	output = output.filter(function(value) {
		return !!value;
	});

	return output;
};
