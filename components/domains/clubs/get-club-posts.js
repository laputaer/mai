
/**
 * get-club-posts.js
 *
 * Find posts related to a club
 */

module.exports = getClubPosts;

/**
 * Find posts by club slug
 *
 * @param   Object  opts  Options { db, slug, limit, range, skip }
 * @return  Array         A list of clubs
 */
function *getClubPosts(opts) {
	var db = opts.db;
	var slug = opts.slug;
	var limit = opts.limit;
	var range = opts.range;
	var skip = opts.skip;

	var Post = db.col('posts');

	var query = {
		club: slug
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
