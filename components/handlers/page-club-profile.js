
/**
 * page-club-profile.js
 *
 * Koa route handler for club profile
 */

var resolver = require('url').resolve;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var createError = require('../helpers/create-error-message');
var i18n = require('../templates/i18n')();
var clubProfile = require('../api/club-profile')();
var clubPosts = require('../api/club-posts')();

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
	var config = this.config;
	var state = this.state;

	data.canonical_url = resolver(data.current_url, data.current_path);

	// STEP 2: find club
	data.club_profile = yield clubProfile;

	// STEP 3: find posts
	data.club_posts = yield clubPosts;

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
