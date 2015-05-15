
/**
 * create-club-post.js
 *
 * Create a club post given data
 */

var cuid = require('cuid');

module.exports = createClubPost;

/**
 * Create a post
 *
 * @param   Object  opts  Options { db, user, club, body, data }
 * @return  Void
 */
function *createClubPost(opts) {
	var db = opts.db;
	var user = opts.user;
	var club = opts.club;
	var body = opts.body;
	var data = opts.data;

	var User = db.col('users');
	var Club = db.col('clubs');
	var Post = db.col('posts');

	// STEP 1: update user action point
	yield User.update({
		uid: user.uid
	}, {
		action_point: user.action_point - 1
	});

	// STEP 2: update club stats
	yield Club.update({
		slug: club.slug
	}, {
		points: club.points ? club.points + 1 : 1
	});

	// STEP 3: create post
	var post = {
		pid: cuid()
		, club: club.slug
		, user: user.uid
		, title: body.title
		, summary: body.summary
		, og: {
			title: data.title
			, url: data.url
			, site_name: data.site_name
			, site_url: data.site_url
			, image: data.image
		}
		, created: new Date()
		, updated: new Date()
	}
	yield Post.insert(post);
};
