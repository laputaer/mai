
/**
 * api-featured-clubs.js
 *
 * API for getting featured clubs
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var showcaseDomain = require('../domains/showcase');
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');
var validate = require('../security/validation');

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
	// optional flow control, so this can be used as component
	if (next) {
		yield next;
	}

	// STEP 1: prepare common data
	var config = this.config;
	var state = this.state;
	var limit = 8;
	var skip = 0;

	if (next) {
		var result = yield validate(this.request.query, 'query');
		if (result.valid) {
			limit = parseInt(this.request.query.limit) || limit;
			skip = parseInt(this.request.query.skip) || skip;
		}
	}

	var club_slugs = this.state.featured_club_ids;

	if (!club_slugs) {
		club_slugs = yield showcaseDomain.getFeaturedIds({
			db: this.db
			, type: 'featured-club-ids'
		});
	}

	club_slugs = club_slugs.slice(skip, limit);

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
