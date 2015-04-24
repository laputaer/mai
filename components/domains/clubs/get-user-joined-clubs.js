
/**
 * get-user-joined-clubs.js
 *
 * Find clubs joined by a user, excluding clubs created by this user
 */

module.exports = getUserJoinedClubs;

/**
 * Find clubs by membership uid
 *
 * @param   Object  opts  Options { db, uid }
 * @return  Array         A list of clubs
 */
function *getUserJoinedClubs(opts) {
	var db = opts.db;
	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	// STEP 1: find all memberships
	var memberships = yield Membership.find({
		uid: opts.uid
	});

	// STEP 2: get all club ids
	memberships = memberships.map(function(member) {
		return member.slug;
	});

	// STEP 3: find all clubs
	var clubs = yield Club.where('slug').in(memberships);

	// STEP 4: filter clubs
	clubs = clubs.filter(function(club) {
		return club.owner !== opts.uid;
	});

	return clubs;
};
