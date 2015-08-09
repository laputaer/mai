
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
 * @param   Object  opts  Options { db, user, club, body, embed }
 * @return  Object        The new post
 */
function *createClubPost(opts) {
	var db = opts.db;
	var user = opts.user;
	var club = opts.club;
	var body = opts.body;
	var embed = opts.embed;

	var User = db.col('users');
	var Club = db.col('clubs');
	var Post = db.col('posts');
	var pid = cuid();

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
		, posts: club.posts ? club.posts + 1 : 1
		, updated: new Date()
	});

	// STEP 3: create post
	var post = {
		pid: pid
		, club: club.slug
		, user: user.uid
		, title: body.title
		, summary: body.summary
		, embed: embed
		, created: new Date()
		, updated: new Date()
	}
	yield Post.insert(post);

	// STEP 4: get the post
	return yield Post.findOne({
		pid: pid
	});
};
