
/**
 * leave-club.js
 *
 * Leave a club given user and club data
 */

module.exports = leaveClub;

/**
 * Leave club and update action point
 *
 * @param   Object  opts  Options { db, club, user }
 * @return  Void
 */
function *leaveClub(opts) {
	var db = opts.db;
	var user = opts.user;
	var club = opts.club;
	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	// STEP 1: remove membership
	yield Membership.remove({
		uid: user.uid
		, slug: club.slug
	});

	// STEP 2: update club stats
	yield Club.update({
		slug: club.slug
	}, {
		members: club.members ? club.members - 1 : 0
	});
};
