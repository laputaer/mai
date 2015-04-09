
/**
 * create-club.js
 *
 * Create local club given input
 */

module.exports = createClub;

/**
 * Create local user
 *
 * @return  Object
 */
function *createClub() {
	var body = this.state.input;
	var db = this.db;

	// new club
	var Club = db.col('clubs');
	try {
		yield Club.insert(body);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	return yield Club.findOne({
		slug: body.slug
	});
};
