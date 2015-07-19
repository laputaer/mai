
/**
 * api-featured-clubs.js
 *
 * API for getting featured clubs
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');

var filter_output = [
	'slug', 'title', 'image', 'intro'
];

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
	if (next) {
		yield next;
	}

	// STEP 1: prepare common data
	var config = this.config;
	var state = this.state;

	var club_slugs = config.showcase.clubs;

	if (!next) {
		club_slugs = club_slugs.slice(0, 5);
	}

	// STEP 2: get featured clubs
	var featured_clubs = yield clubsDomain.getFeaturedClubs({
		db: this.db
		, slugs: club_slugs
	});

	// STEP 3: filter output
	featured_clubs = featured_clubs.map(function (club) {
		if (club.embed) {
			// thumbnail
			if (Array.isArray(club.embed.image) && club.embed.image.length > 0) {
				var image = club.embed.image[0];
				club.image = proxyUrl({
					url: image.secure_url || image.url
					, key: config.proxy.key
					, base: state.image_base_url
				});
			}
		}

		return filterAttributes(club, filter_output);
	});

	if (!next) {
		return featured_clubs;
	}

	// STEP 4: output json
	this.state.json = getStandardJson(featured_clubs);
};
