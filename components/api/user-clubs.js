
/**
 * user-clubs.js
 *
 * API for getting clubs owned or joined by current user
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var getCoolInitials = require('../helpers/get-cool-initials');
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');

var filter_output = [
	'slug', 'title', 'image'
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

	// STEP 2: get clubs
	var user_clubs = yield clubsDomain.getUserClubs({
		db: this.db
		, uid: this.session.uid
		, select: {
			slug: 1
			, title: 1
			, embed: 1
		}
	});

	// STEP 3: filter output
	user_clubs = user_clubs.map(function (club) {
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
		return user_clubs;
	}

	// STEP 4: output json
	this.state.json = getStandardJson(user_clubs);
};
