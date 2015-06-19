
/**
 * get-club-posts.js
 *
 * Find latest posts
 */

module.exports = getPosts;

/**
 * Find latest posts
 *
 * @param   Object  opts  Options { db, skip, limit }
 * @return  Array         A list of clubs
 */
function *getPosts(opts) {
	var db = opts.db;
	var limit = opts.limit || 20;
	var skip = opts.skip || 0;
	var Post = db.col('posts');

	return yield Post.find().sort({ created: -1 }).limit(limit).skip(skip);
};
