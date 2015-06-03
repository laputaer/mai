
/**
 * club-ranking.js
 *
 * Koa route handler for club search page
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');
var getCoolInitials = require('../helpers/get-cool-initials');

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

	// STEP 2: load clubs
	data.clubs = yield clubsDomain.getRankedClubs({
		db: this.db
	});

	data.clubs_created = yield clubsDomain.getRecentlyCreatedClubs({
		db: this.db
	});

	data.clubs = data.clubs.map(function(club) {
		return clubPreviewOutput(club, config, state);
	});

	data.clubs_created = data.clubs_created.map(function(club) {
		return clubPreviewOutput(club, config, state);
	});

	// STEP 3: render page
	this.state.vdoc = builder(data);
};

/**
 * Prepare club preview output
 *
 * @param   Object  club    Club profile
 * @param   Object  config  Global config
 * @param   Object  state   View state
 * @return  Object          Update club profile
 */
function clubPreviewOutput(club, config, state) {
	if (club.embed && club.embed.image && club.embed.image.length > 0) {
		club.embed.image = club.embed.image[0];
		club.embed.image.url = proxyUrl({
			url: club.embed.image.secure_url || club.embed.image.url
			, key: config.proxy.key
			, base: state.image_base_url
		});
	}

	club.initials = getCoolInitials(club.title);

	return club;
};
