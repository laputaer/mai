
/**
 * page-home.js
 *
 * Koa route handler for index page
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var showcaseDomain = require('../domains/showcase');
var featurePosts = require('../api/featured-posts')();
var featureClubs = require('../api/featured-clubs')();

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
	this.state.featured_club_ids = yield showcaseDomain.getFeaturedIds({
		db: this.db
		, type: 'featured-club-ids'
	});
	this.state.featured_post_ids = yield showcaseDomain.getFeaturedIds({
		db: this.db
		, type: 'featured-post-ids'
	});

	// STEP 2: get featured clubs
	// note that yield here call method using current context, ie. koa, which is exactly what we need
	data.featured_clubs = yield featureClubs;

	// STEP 3: get featured posts
	data.featured_posts = yield featurePosts;

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
