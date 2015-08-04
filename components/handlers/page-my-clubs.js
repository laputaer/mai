
/**
 * page-my-clubs.js
 *
 * Koa route handler for current user's clubs
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var myClubs = require('../api/current-user-owned-clubs')();
var joinedClubs = require('../api/current-user-joined-clubs')();
var createError = require('../helpers/create-error-message');
var i18n = require('../templates/i18n')();

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
		this.state.error_page = createError(400, i18n.t('error.login-required'));
		return;
	}

	// STEP 3: get user clubs
	data.my_clubs = yield myClubs;
	data.joined_clubs = yield joinedClubs;

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
