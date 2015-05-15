
/**
 * club-post-add.js
 *
 * Koa route handler for club post creation page
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var createError = require('../helpers/create-error-message');
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
			, data.i18n.t('error.not-found-club')
		);
		return;
	}

	// STEP 3: user should be login
	if (!data.current_user) {
		this.redirect('/login/redirect?section=c&id=' + slug);
		return;
	}

	// STEP 4: check membership
	var membership = yield clubsDomain.matchMembership({
		db: this.db
		, uid: data.current_user.uid
		, slug: slug
	});

	if (!membership) {
		this.flash = formError(
			this.i18n.t('error.membership-required-to-post')
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 5: render page
	this.state.vdoc = builder(data);
};