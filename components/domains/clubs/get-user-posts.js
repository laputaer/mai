
/**
 * get-user-posts.js
 *
 * Find posts related to a user
 */

module.exports = getUserPosts;

/**
 * Find posts by user id
 *
 * @param   Object  opts  Options { db, uid, limit, range, skip }
 * @return  Array         A list of clubs
 */
function *getUserPosts(opts) {
	var db = opts.db;
	var uid = opts.uid;
	var limit = opts.limit;
	var range = opts.range;
	var skip = opts.skip;

	var Post = db.col('posts');

	var query = {
		user: uid
	};

	if (range > 0) {
		query.created = {
			'$lt': range
		};
	}

	// STEP 1: find memberships
	var posts = yield Post.find(query).sort({ created: -1 }).limit(limit).skip(skip);

	return posts ? posts : [];
};
