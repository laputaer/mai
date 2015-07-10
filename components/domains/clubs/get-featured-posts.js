
/**
 * get-featured-posts.js
 *
 * Get posts given pids, return result using order specified
 */

module.exports = getFeaturedPosts;

/**
 * Get posts given pids
 *
 * @param   Object  opts  Options { db, pids }
 * @return  Array         A list of posts
 */
function *getFeaturedPosts(opts) {
	var db = opts.db;
	var pids = opts.pids;
	var Post = db.col('posts');

	var posts = yield Post.where('pid').in(pids);
	var output = [];

	posts.forEach(function (post) {
		var pos = pids.indexOf(post.pid);
		output[pos] = post;
	});

	output = output.filter(function(value) {
		return !!value;
	});

	return output;
};
