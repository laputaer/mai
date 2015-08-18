
/**
 * create-favorite-post.js
 *
 * Favorite a club post given user and post
 */

module.exports = createFavoritePost;

/**
 * Favorite a post
 *
 * @param   Object  opts  Options { db, user, post }
 * @return  Void
 */
function *createFavoritePost(opts) {
	var db = opts.db;
	var user = opts.user;
	var post = opts.post;

	var Social = db.col('social');
	var User = db.col('users');
	var Post = db.col('posts');

	// STEP 1: update fav-er stats
	yield User.update({
		uid: user
	}, {
		$inc: {
			action_point: -1
			, fav_count: 1
		}
	});

	// STEP 2: update post-er stats
	yield User.update({
		uid: post.user
	}, {
		$inc: {
			fav_point: 1
		}
	});

	// STEP 3: update post stats
	yield Post.update({
		pid: post.pid
	}, {
		$inc: {
			fav_point: 1
		}
	});

	// STEP 4: create social action
	var fav = {
		post: post.pid
		, user: user
		, created: new Date()
		, updated: new Date()
	}
	yield Social.insert(fav);
};
