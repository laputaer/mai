
/**
 * club-update.js
 *
 * Koa route handler for club update
 */

var builders = require('../builders/builders');
var validate = require('../security/validation');

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');

var createError = require('../helpers/create-custom-error');
var formError = require('../helpers/create-form-error');

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

	var slug = this.params.slug;
	var user = this.state.user;

	// STEP 1: user should be login
	if (!user) {
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 2: club should exist and owner should match
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	if (!club) {
		this.redirect('/club');
		return;
	}

	if (club.owner !== user.uid) {
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 2: input validation
	var body = this.request.body;
	var result = yield sessionDomain.verifyCsrfToken({
		session: this.session
		, cache: this.cache
		, token: body.csrf_token
	});

	if (!result) {
		this.flash = formError(
			'error.invalid-csrf-token'
			, null
			, null
			, body
		);
		this.redirect('/c/' + slug + '/edit');
		return;
	}

	result = yield validate(body, 'club');

	if (!result.valid) {
		this.flash = createError(result.errors, body);
		this.redirect('/c/' + slug + '/edit');
		return;
	}

	// STEP 3: update club
	club = yield clubsDomain.updateClub({
		db: this.db
		, data: body
	});

	this.redirect('/c/' + club.slug + '/edit');
};
