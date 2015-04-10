
/**
 * create-club.js
 *
 * Create local club given input
 */

module.exports = createClub;

/**
 * Create local user
 *
 * @return  Mixed
 */
function *createClub() {
	var body = this.state.input;
	var user = this.user;
	var db = this.db;

	// new club
	var Club = db.col('clubs');
	var User = db.col('users');
	var Membership = db.col('memberships');
	try {
		yield User.update({
			uid: user.uid
		}, {
			action_point: user.action_point - 10
		});

		body.created = new Date();
		body.updated = new Date();
		body.points = 10;
		body.members = 1;
		yield Club.insert(body);

		var club = yield Club.findOne({
			slug: body.slug
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

	return club;
};
