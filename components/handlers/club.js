
/**
 * club.js
 *
 * Koa route handler for club page
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
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

	// STEP 1: prepare common data
	var data = prepareData(this);

	// STEP 2: user should be login
	if (!data.current_user) {
		this.redirect('/login/redirect?section=c&id=club-home');
		return;
	}

	// STEP 3: get current user, club owned by user, club joined by user
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

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
