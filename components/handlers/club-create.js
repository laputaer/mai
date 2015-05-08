
/**
 * club-create.js
 *
 * Koa route handler for club page
 */

var builders = require('../builders/builders');
var validate = require('../security/validation');

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');

var formError = require('../helpers/create-form-message');

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

	// guest user
	if (!this.state.user) {
		this.redirect('/c');
		return;
	}

	var user = this.state.user;
	var body = this.request.body;

	// STEP 1: input validation
	var result = yield sessionDomain.verifyCsrfToken({
		session: this.session
		, cache: this.cache
		, token: body.csrf_token
	});

	if (!result) {
		this.flash = formError(
			this.i18n.t('error.invalid-csrf-token')
			, body
		);
		this.redirect('/c/add');
		return;
	}

	result = yield validate(body, 'club');

	if (!result.valid) {
		this.flash = formError(
			this.i18n.t('error.form-input-invalid')
			, body
			, result.errors
		);
		this.redirect('/c/add');
		return;
	}

	// STEP 2: get full user data
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

	// check user action point
	if (user.action_point < 10) {
		this.flash = formError(
			this.i18n.t('error.insufficient-action-point', {
				required: 10
				, current: user.action_point
			})
			, body
		);
		this.redirect('/c/add');
		return;
	}

	// STEP 3: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: body.slug
	});

	// club already exists
	if (club) {
		this.flash = formError(
			this.i18n.t('error.already-exist')
			, body
			, ['slug']
		);
		this.redirect('/c/add');
		return;
	}

	// STEP 4: create new club
	club = yield clubsDomain.createClub({
		db: this.db
		, user: user
		, data: body
	});

	// unexpected error
	if (!club) {
		this.flash = formError(
			this.i18n.t('error.form-internal-error')
			, body
		);
		this.redirect('/c/add');
		return;
	}

	this.redirect('/c');
};
