
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
	try {
		yield User.update({
			uid: user.uid
		}, {
			action_point: user.action_point - 10
		});
		yield Club.insert(body);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	return yield Club.findOne({
		slug: body.slug
	});
};
