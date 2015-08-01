
/**
 * recent-clubs.js
 *
 * API for getting recent clubs
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var getCoolInitials = require('../helpers/get-cool-initials');
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');
var validate = require('../security/validation');

var filter_output = [
	'slug', 'title', 'image', 'intro', 'points', 'members', 'initials'
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
	var limit = 10;
	var skip = 0;

	if (next) {
		var result = yield validate(this.request.query, 'query');
		if (result.valid) {
			limit = parseInt(this.request.query.limit) || limit;
			skip = parseInt(this.request.query.skip) || skip;
		}
	}

	// STEP 2: get clubs
	var recent_clubs = yield clubsDomain.getRecentClubs({
		db: this.db
		, points: 11
		, limit: limit
		, skip: skip
	});

	// STEP 3: filter output
	recent_clubs = recent_clubs.map(function (club) {
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

		if (club.title) {
			// placeholder
			club.initials = getCoolInitials(club.title);
		}

		return filterAttributes(club, filter_output);
	});

	if (!next) {
		return recent_clubs;
	}

	// STEP 4: output json
	this.state.json = getStandardJson(recent_clubs);
};
