
/**
 * club-edit.js
 *
 * Koa route handler for club management page
 */

var builders = require('../builders/builders');
var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var createError = require('../helpers/create-error-response');

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

	// prepare common data
	var data = builders.prepareData(this);
	var error;

	// STEP 1: find club
	data.club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (!data.club) {
		this.state.error_page = createError(
			404
			, data.i18n.t('error.not-found-club')
		);
		return;
	}

	// STEP 2: user should be login
	if (!data.current_user) {
		this.redirect('/login/redirect?section=c&id=' + data.club.slug + '&action=edit');
		return;
	}

	// STEP 3: check user is owner
	if (data.club.owner !== data.current_user.uid) {
		this.state.error_page = createError(
			403
			, data.i18n.t('error.access-control')
		);
		this.state.vdoc = builders.doc(data);
		return;
	}

	// STEP 4: find user profile
	data.user = yield usersDomain.matchUser({
		db: this.db
		, uid: data.current_user.uid
	});
	data.body.push(builders.clubEditor(data));

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
