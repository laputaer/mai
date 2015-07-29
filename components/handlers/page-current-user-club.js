
/**
 * page-current-user-clubs.js
 *
 * Koa route handler for current user's clubs
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var usersDomain = require('../domains/users');
var myClubs = require('../api/current-user-owned-clubs')();
var joinedClubs = require('../api/current-user-joined-clubs')();

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

	// STEP 3: get full user profile
	data.user = yield usersDomain.matchUser({
		db: this.db
		, uid: this.session.uid
	});

	// STEP 4 :get user clubs
	data.my_clubs = yield myClubs;
	data.joined_clubs = yield joinedClubs;

	// STEP 5: render page
	this.state.vdoc = builder(data);
};
