
/**
 * page-home.js
 *
 * Koa route handler for index page
 */

var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');

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

	// STEP 2: get featured clubs
	data.featured_clubs = yield clubsDomain.getFeaturedClubs({
		db: this.db
		, slugs: config.showcase.clubs
	});

	data.featured_clubs = data.featured_clubs.map(function (club) {
		if (club.embed && Array.isArray(club.embed.image) && club.embed.image.length > 0) {
			var image = club.embed.image[0];
			club.image = proxyUrl({
				url: image.secure_url || image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		return club;
	});

	// STEP 3: get featured posts
	data.featured_posts = yield clubsDomain.getFeaturedPosts({
		db: this.db
		, pids: [
			'cibqol3sd000ttwdr0yal9nqm'
			, 'cibhdxsjb0001twdravxvlhl1'
			, 'cibq3sry6000ptwdrrqjxqans'
			, 'cia12sy2u000luhdrhjcxhrbl'
			, 'ciaqb36wg0002rbdrpm0e8w0m'
		]
	});

	data.featured_posts = data.featured_posts.map(function (post) {
		if (post.embed && Array.isArray(post.embed.image) && post.embed.image.length > 0) {
			var image = post.embed.image[0];
			post.image = proxyUrl({
				url: image.secure_url || image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		if (post.embed && post.embed.url) {
			var url = parser(post.embed.url);
			post.domain = url.hostname;
		}

		return post;
	});

	// STEP 4: render page
	this.state.vdoc = builder(data);
};
