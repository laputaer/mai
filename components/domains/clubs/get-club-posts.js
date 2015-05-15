
/**
 * get-club-posts.js
 *
 * Find posts related to a club
 */

module.exports = getClubPosts;

/**
 * Find posts by club slug
 *
 * @param   Object  opts  Options { db, slug }
 * @return  Array         A list of clubs
 */
function *getClubPosts(opts) {
	var db = opts.db;
	var slug = opts.slug;
	var Post = db.col('posts');

	// null if club not found
	return yield Post.find({
		club: slug
	}).limit(20);
};