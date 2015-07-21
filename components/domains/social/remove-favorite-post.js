
/**
 * remove-favorite-post.js
 *
 * Unfavorite a club post given user and post
 */

module.exports = removeFavoritePost;

/**
 * Unfavorite a post
 *
 * @param   Object  opts  Options { db, user, post }
 * @return  Void
 */
function *removeFavoritePost(opts) {
	var db = opts.db;
	var user = opts.user;
	var post = opts.post;

	var Social = db.col('social');
	var User = db.col('users');
	var Post = db.col('posts');

	// STEP 1: update user stats
	yield User.update({
		uid: user.uid
	}, {
		$inc: {
			fav_count: -1
		}
	});

	yield User.update({
		uid: post.user
	}, {
		$inc: {
			fav_point: -1
		}
	});

	// STEP 2: update post stats
	yield Post.update({
		pid: post.pid
	}, {
		$inc: {
			fav_point: -1
		}
	});

	// STEP 3: remove social action
	yield Social.remove({
		post: post.pid
		, user: user.uid
	});
};
