
/**
 * get-club-posts.js
 *
 * Find latest posts
 */

module.exports = getPosts;

/**
 * Find latest posts
 *
 * @param   Object  opts  Options { db }
 * @return  Array         A list of clubs
 */
function *getPosts(opts) {
	var db = opts.db;
	var Post = db.col('posts');

	return yield Post.find().sort({ created: -1 }).limit(20);
};
