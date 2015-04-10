
/**
 * join-club.js
 *
 * Join a club
 */

module.exports = createClub;

/**
 * Join a club
 *
 * @return  Void
 */
function *createClub() {
	var club = this.club;
	var user = this.user;
	var db = this.db;

	var User = db.col('users');
	var Club = db.col('clubs');
	var Membership = db.col('memberships');
	try {
		yield User.update({
			uid: user.uid
		}, {
			action_point: user.action_point - 2
		});
		yield Club.update({
			slug: club.slug
		}, {
			members: club.members ? club.members + 1 : 1
			, points: club.points ? club.points + 2 : 2
		});
		yield Membership.insert({
			uid: user.uid
			, slug: club.slug
			, created: new Date()
			, updated: new Date()
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}
};
