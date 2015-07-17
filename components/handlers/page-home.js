
/**
 * page-home.js
 *
 * Koa route handler for index page
 */

var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
var proxyUrl = require('../security/proxy');

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

	// STEP 2: get featured clubs
	// note that yield here call method using current context, ie. koa, which is exactly what we need
	data.featured_clubs = yield featureClubs;

	// STEP 3: get featured posts
	data.featured_posts = yield featurePosts;

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
