
/**
 * club.js
 *
 * Koa route handler for club page
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var usersDomain = require('../domains/users');
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

	// STEP 2: user should be login
	if (!data.current_user) {
		this.redirect('/login/redirect?section=c&id=club-home');
		return;
	}

	// STEP 3: get current user, club owned by user, club joined by user
	data.user = yield usersDomain.matchUser({
		db: this.db
		, uid: data.current_user.uid
	});
	data.clubs = yield clubsDomain.getUserOwnedClubs({
		db: this.db
		, uid: data.current_user.uid
	});
	data.joined_clubs = yield clubsDomain.getUserJoinedClubs({
		db: this.db
		, uid: data.current_user.uid
	});

	data.clubs = data.clubs.map(function(club) {
		return clubPreviewOutput(club, config, state);
	});

	data.joined_clubs = data.joined_clubs.map(function(club) {
		return clubPreviewOutput(club, config, state);
	});

	// STEP 4: render page
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

	return club;
};
