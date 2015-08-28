
/**
 * page-club-profile.js
 *
 * Koa route handler for club profile
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var createError = require('../helpers/create-error-message');
var i18n = require('../templates/i18n')();
var clubProfile = require('../api/club-profile')();
var clubPosts = require('../api/club-posts')();
var userStashItem = require('../api/user-stash-item')();
var validate = require('../security/validation');

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
	data.club_profile = yield clubProfile;

	if (!data.club_profile) {
		this.state.error_page = createError(404, i18n.t('error.not-found-club'));
		return;
	}

	// STEP 3: handle stash share
	data.stash_item = yield userStashItem;

	// STEP 4: show share form or post list
	if (data.stash_item.url) {
		data.ui['club-posts-section'] = 1;
	} else {
		data.club_posts = yield clubPosts;
	}

	// STEP 5: render page
	this.state.vdoc = builder(data);
};
