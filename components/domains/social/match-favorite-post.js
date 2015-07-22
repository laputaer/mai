
/**
 * match-favorite-post.js
 *
 * Match favorite by pid and uid
 */

module.exports = matchFavoritePost;

/**
 * Match post
 *
 * @param   Object  opts  Options { db, pid, uid }
 * @return  Object        Club data
 */
function *matchFavoritePost(opts) {
	var db = opts.db;
	var Social = db.col('social');

	// null if favorite not found
	return yield Social.findOne({
		post: opts.pid
		, user: opts.uid
	});
};
