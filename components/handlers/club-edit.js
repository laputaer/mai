
/**
 * club-edit.js
 *
 * Koa route handler for club management editor interface
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var createError = require('../helpers/create-error-message');
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
	var slug = this.params.slug;

	// STEP 2: find existing club
	data.club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	if (!data.club) {
		this.state.error_page = createError(
			404
			, i18n.t('error.not-found-club')
		);
		return;
	}

	// STEP 3: user should be login
	if (!data.current_user) {
		this.redirect('/login/redirect?section=c&id=' + slug + '&action=edit');
		return;
	}

	// STEP 4: check owner
	if (data.club.owner !== data.current_user.uid) {
		this.state.error_page = createError(
			403
			, i18n.t('error.access-control')
		);
		return;
	}

	// STEP 5: render page
	this.state.vdoc = builder(data);
};
