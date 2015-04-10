
/**
 * find-joined-clubs.js
 *
 * Find joined clubs by user uid
 */

module.exports = findJoinedClubs;

/**
 * Find joined club
 *
 * @return  Object
 */
function *findJoinedClubs() {
	var db = this.db;
	var uid = this.session.uid;

	var Club = db.col('clubs');
	var Membership = db.col('memberships');

	try {
		var memberships = yield Membership.find({
			uid: uid
		});

		memberships = memberships.map(function(member) {
			return member.slug;
		});

		var clubs = yield Club.where('slug').in(memberships);

		clubs = clubs.filter(function(club) {
			return club.owner !== uid;
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	return clubs;
};
