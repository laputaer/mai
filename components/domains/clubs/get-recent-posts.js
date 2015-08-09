
/**
 * get-recent-posts.js
 *
 * Find recent posts
 */

module.exports = getRecentPosts;

/**
 * Find posts order by create date
 *
 * @param   Object  opts  Options { db, limit, skip }
 * @return  Array         A list of posts
 */
function *getRecentPosts(opts) {
	var db = opts.db;
	var limit = opts.limit;
	var skip = opts.skip;

	var Post = db.col('posts');

	// STEP 1: find posts
	var posts = yield Post.find().sort({ created: -1 }).limit(limit).skip(skip);

	return posts;
};
