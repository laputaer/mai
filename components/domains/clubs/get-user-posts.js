
/**
 * get-user-posts.js
 *
 * Find posts related to a user
 */

module.exports = getUserPosts;

/**
 * Find posts by user id
 *
 * @param   Object  opts  Options { db, uid }
 * @return  Array         A list of clubs
 */
function *getUserPosts(opts) {
	var db = opts.db;
	var uid = opts.uid;
	var Post = db.col('posts');

	return yield Post.find({
		user: uid
	}).sort({ created: -1 }).limit(20);
};
