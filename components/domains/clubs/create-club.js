
/**
 * create-club.js
 *
 * Create a club given data
 */

module.exports = createClub;

/**
 * Create and return a club
 *
 * @param   Object  opts  Options { db, user, data }
 * @return  Object        Club data
 */
function *createClub(opts) {
	var db = opts.db;
	var user = opts.user;
	var data = opts.data;

	var User = db.col('users');
	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	// STEP 1: update user action point
	yield User.update({
		uid: user.uid
	}, {
		action_point: user.action_point - 10
	});

	// STEP 2: create club
	var club = {
		title: data.title
		, slug: data.slug
		, owner: user.uid
		, members: 1
		, points: 10
		, created: new Date()
		, updated: new Date()
	}
	yield Club.insert(club);

	// STEP 3: setup membership
	yield Membership.insert({
		uid: user.uid
		, slug: club.slug
		, created: new Date()
		, updated: new Date()
	});

	// null if club not found
	return yield Club.findOne({
		slug: data.slug
	});
};
