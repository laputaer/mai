
/**
 * api-featured-clubs.js
 *
 * API for getting featured clubs
 */

var normalize = require('../security/normalization');
var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();
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
	var config = this.config;
	var state = this.state;

	// STEP 2: get featured clubs
	var featured_clubs = yield clubsDomain.getFeaturedClubs({
		db: this.db
		, slugs: config.showcase.clubs
	});

	featured_clubs = featured_clubs.map(function (club) {
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

	// STEP 3: filter data
	//var user = normalize(this.state.user, 'outputUser');

	// STEP 4: output json
	this.state.json = getStandardJson(featured_clubs);
};
