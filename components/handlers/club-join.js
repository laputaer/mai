
/**
 * club-join.js
 *
 * Koa route handler for joining a club
 */

var builders = require('../builders/builders');

var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');

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
		this.redirect('/club');
		return;
	}

	var user = this.state.user;
	var slug = this.params.slug;

	// STEP 1: get full user data
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

	// check user action point
	if (user.action_point < 2) {
		this.flash = formError(
			body
			, this.i18n('error.insufficient-action-point', {
				required: 2
				, current: user.action_point
			})
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 2: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	// club does not exists
	if (!club) {
		this.redirect('/club');
		return;
	}

	// STEP 3: check membership
	var member = yield clubsDomain.matchMembership({
		db: this.db
		, slug: slug
		, uid: user.uid
	});

	// already a member of the club
	if (member) {
		this.redirect('/club');
		return;
	}

	// STEP 4: join club
	yield clubsDomain.joinClub({
		db: this.db
		, club: club
		, user: user
	});

	this.redirect('/club');
};
