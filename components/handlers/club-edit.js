
/**
 * club-edit.js
 *
 * Koa route handler for club management page
 */

var builders = require('../builders/builders');
var clubsDomain = require('../domains/clubs');
var createError = require('../helpers/create-error-message');

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
	var data = builders.prepareData(this);
	var slug = this.params.slug;

	// STEP 2: user should be login
	if (!data.current_user) {
		this.redirect('/login/redirect?section=c&id=' + slug + '&action=edit');
		return;
	}

	// STEP 3: find existing club, check owner
	data.club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	if (!data.club) {
		this.state.error_page = createError(
			404
			, data.i18n.t('error.not-found-club')
		);
		return;
	}

	if (data.club.owner !== data.current_user.uid) {
		this.state.error_page = createError(
			403
			, data.i18n.t('error.access-control')
		);
		this.state.vdoc = builders.doc(data);
		return;
	}

	// STEP 4: render page
	data.body.push(builders.clubEditor(data));
	this.state.vdoc = builders.doc(data);
};
