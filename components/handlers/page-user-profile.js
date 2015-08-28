
/**
 * page-user-profile.js
 *
 * Koa route handler for user profile
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var createError = require('../helpers/create-error-message');
var i18n = require('../templates/i18n')();
var userProfile = require('../api/user-profile')();
var userPosts = require('../api/user-posts')();

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

	// STEP 2: find club
	data.user_profile = yield userProfile;

	if (!data.user_profile) {
		this.state.error_page = createError(404, i18n.t('error.not-found-user'));
		return;
	}

	// STEP 3: find posts
	data.user_posts = yield userPosts;

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
