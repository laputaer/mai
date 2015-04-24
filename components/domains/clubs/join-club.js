
/**
 * join-club.js
 *
 * Join a club given user and club data
 */

module.exports = joinClub;

/**
 * Join club and update action point
 *
 * @param   Object  opts  Options { db, club, user }
 * @return  Void
 */
function *joinClub(opts) {
	var db = opts.db;
	var user = opts.user;
	var club = opts.club;
	var User = db.col('users');
	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	// STEP 1: update user action point
	yield User.update({
		uid: user.uid
	}, {
		action_point: user.action_point - 2
	});

	// STEP 2: update club stats
	yield Club.update({
		slug: club.slug
	}, {
		members: club.members ? club.members + 1 : 1
		, points: club.points ? club.points + 2 : 2
	});

	// STEP 3: register membership
	yield Membership.insert({
		uid: user.uid
		, slug: club.slug
		, created: new Date()
		, updated: new Date()
	});
};
