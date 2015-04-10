
/**
 * search-clubs.js
 *
 * Search clubs by title
 */

module.exports = searchClubs;

/**
 * Search club
 *
 * @return  Array
 */
function *searchClubs() {
	var db = this.db;
	var search = this.state.search;

	var Club = db.col('clubs');

	// search title and slug
	return yield Club.where({
		'$or': [
			{
				title: {
					'$regex': new RegExp('^' + search, 'i')
				}
			}
			, {
				slug: {
					'$regex': new RegExp('^' + search, 'i')
				}
			}
		]
	}).sort({ created: 1 });
};
