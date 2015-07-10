
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
		, slugs: ['frontend-talk', 'marisa', 'eventer']
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

	// STEP 3: render page
	this.state.vdoc = builder(data);
};
