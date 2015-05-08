
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

	// STEP 1: prepare common data
	var user = this.state.user;

	// STEP 2: user should be login
	if (!user) {
		this.redirect('/');
		return;
	}

	// STEP 3: csrf validation
	var body = this.request.body;
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

	// STEP 4: input validation
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

	// STEP 5: check user action point
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

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

	// STEP 6: find existing club
	var exist = yield clubsDomain.matchClub({
		db: this.db
		, slug: body.slug
	});

	if (exist) {
		this.flash = formError(
			this.i18n.t('error.club-already-exist')
			, body
			, ['slug']
		);
		this.redirect('/c/add');
		return;
	}

	// STEP 7: create new club
	club = yield clubsDomain.createClub({
		db: this.db
		, user: user
		, data: body
	});

	this.redirect('/c/' + club.slug);
};
