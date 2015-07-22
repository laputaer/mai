
/**
 * match-post.js
 *
 * Match post by pid
 */

module.exports = matchPost;

/**
 * Match post
 *
 * @param   Object  opts  Options { db, pid }
 * @return  Object        Club data
 */
function *matchPost(opts) {
	var db = opts.db;
	var Post = db.col('posts');

	// null if post not found
	return yield Post.findOne({
		pid: opts.pid
	});
};
