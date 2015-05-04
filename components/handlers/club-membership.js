
/**
 * club-membership.js
 *
 * Koa route handler for joining a club
 */

var builders = require('../builders/builders');

var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
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

	var slug = this.params.slug;
	var user = this.state.user;
	var body = this.request.body;

	// STEP 1: user should be login
	if (!user) {
		this.redirect('/');
		return;
	}

	// STEP 2: join or leave
	if (body.put !== '1' && body.del !== '1') {
		this.redirect('/');
		return;
	}

	// STEP 3: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	if (!club) {
		this.redirect('/');
		return;
	}

	// STEP 4: find user and membership
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

	var membership = yield clubsDomain.matchMembership({
		db: this.db
		, uid: user.uid
		, slug: slug
	});

	if ((membership && body.put === '1')
		&& (!membership && body.del === '1'))
	{
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 5: input validation
	var result = yield sessionDomain.verifyCsrfToken({
		session: this.session
		, cache: this.cache
		, token: body.csrf_token
	});

	if (!result) {
		this.flash = formError(
			this.i18n.t('error.invalid-csrf-token')
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 6: action point check
	if (body.put === '1' && user.action_point < 2) {
		this.flash = formError(
			this.i18n.t('error.insufficient-action-point', {
				required: 2
				, current: user.action_point
			})
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 7: perform action
	if (body.put === '1') {
		yield clubsDomain.joinClub({
			db: this.db
			, club: club
			, user: user
		});
	} else if (body.del === '1') {
		yield clubsDomain.leaveClub({
			db: this.db
			, club: club
			, user: user
		});
	}

	this.redirect('/c/' + slug);
};
