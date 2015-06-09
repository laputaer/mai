
/**
 * club-search.js
 *
 * Koa route handler for club search page
 */

var escapeRegex = require('escape-string-regexp');

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var validate = require('../security/validation');
var formError = require('../helpers/create-form-message');
var getCoolInitials = require('../helpers/get-cool-initials');
var proxyUrl = require('../security/proxy');
var i18n = require('../templates/i18n')();

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
	var query = this.request.query;
	var config = this.config;
	var state = this.state;

	// STEP 2: input validation
	var result = yield validate(query, 'search');

	if (!result.valid) {
		this.flash = formError(
			i18n.t('error.form-input-invalid')
			, query
			, ['q']
		);
		this.redirect('/c/club-search');
		return;
	}

	// STEP 3: empty input or initial state
	if (!query.q) {
		data.search = '';
		data.clubs = [];
		this.state.vdoc = builder(data);
		return;
	}

	// STEP 4: run search
	data.search = query.q;
	data.clubs = yield clubsDomain.searchClubs({
		db: this.db
		, search: escapeRegex(query.q)
	});

	data.clubs = data.clubs.map(function(club) {
		return clubPreviewOutput(club, config, state);
	});

	// STEP 5: render page
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
