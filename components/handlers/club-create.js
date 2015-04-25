
/**
 * club-create.js
 *
 * Koa route handler for club page
 */

var builders = require('../builders/builders');
var validate = require('../security/validation');

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');

var createError = require('../helpers/create-custom-error')
var formError = require('../helpers/create-form-error')

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
		this.redirect('/club');
		return;
	}

	var user = this.state.user;
	var body = this.request.body;

	// input validation
	var result = yield validate(body, 'club');
	
	if (!result.valid) {
		this.flash = createError(result.errors, body);
		this.redirect('/club/add');
		return;
	}

	// STEP 1: get full user data
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

	// check user action point
	if (user.action_point < 10) {
		this.flash = formError(
			'error.insufficient-action-point'
			, {
				required: 10
				, current: user.action_point
			}
			, null
			, body
		);
		this.redirect('/club/add');
		return;
	}

	// STEP 2: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: body.slug
	});

	// club already exists
	if (club) {
		this.flash = formError(
			'club.already-exist'
			, null
			, ['slug']
			, body
		);
		this.redirect('/club/add');
		return;
	}

	// STEP 3: create new club
	club = yield clubsDomain.createClub({
		db: this.db
		, user: user
		, data: body
	});

	// unexpected error
	if (!club) {
		this.flash = formError(
			'error.form-internal-error'
			, null
			, null
			, body
		);
		this.redirect('/club/add');
		return;
	}

	this.redirect('/club');
};
