
/**
 * club.js
 *
 * Koa route handler for club page
 */

var builders = require('../builders/builders');
var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory() {
	return middleware;
};

/**
 * Koa middleware
 *
 * @param   Function  next  Flow control
 * @return  Void
 */
function *middleware(next) {
	yield next;

	// prepare common data
	var data = builders.prepareData(this);

	// guest user
	if (!data.current_user) {
		data.body.push(builders.login(data));
		this.state.vdoc = builders.doc(data);
		return;
	}

	// login user
	try {
		data.user = yield usersDomain.matchUser({
			db: this.db
			, uid: data.current_user.uid
		});
		data.clubs = yield clubsDomain.getUserOwnedClubs({
			db: this.db
			, uid: data.current_user.uid
		});
		data.joined_clubs = yield clubsDomain.getUserJoinedClubs({
			db: this.db
			, uid: data.current_user.uid
		});
		data.body.push(builders.club(data));
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
