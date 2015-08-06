
/**
 * search-clubs.js (deprecated)
 *
 * Search clubs by title and slug
 */

module.exports = searchClubs;

/**
 * Search club
 *
 * @param   Object  opts  Options { db, search }
 * @return  Array         A list of clubs
 */
function *searchClubs(opts) {
	var db = opts.db;
	var Club = db.col('clubs');

	// search title and slug, sort by created date
	return yield Club.where({
		'$or': [
			{
				title: {
					'$regex': new RegExp('^' + opts.search, 'i')
				}
			}
			, {
				slug: {
					'$regex': new RegExp('^' + opts.search, 'i')
				}
			}
		]
	}).sort({ created: 1 }).limit(20);
};
