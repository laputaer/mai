
/**
 * club-post-create.js
 *
 * Koa route handler for post creation
 */

var parser = require('url').parse;

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var oembedDomain = require('../domains/oembed');
var validate = require('../security/validation');
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
	var slug = this.params.slug;
	var config = this.config;

	// STEP 2: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	if (!club) {
		this.redirect('/');
		return;
	}

	// STEP 3: user should be login
	if (!user) {
		this.redirect('/login/redirect?section=c&id=' + slug);
		return;
	}

	// STEP 4: check membership
	var membership = yield clubsDomain.matchMembership({
		db: this.db
		, uid: user.uid
		, slug: slug
	});

	if (!membership) {
		this.flash = formError(
			this.i18n.t('error.membership-required-to-post')
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 5: check user action point
	user = yield usersDomain.matchUser({
		db: this.db
		, uid: user.uid
	});

	if (user.action_point < 1) {
		this.flash = formError(
			this.i18n.t('error.insufficient-action-point', {
				required: 1
				, current: user.action_point
			})
			, body
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 6: csrf validation
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
		this.redirect('/c/' + slug + '/p/post-add-2');
		return;
	}

	// STEP 7: input validation
	result = yield validate(body, 'postConfirm');

	if (!result.valid) {
		this.flash = formError(
			this.i18n.t('error.form-input-invalid')
			, body
			, result.errors
		);
		this.redirect('/c/' + slug + '/p/post-add-2');
		return;
	}

	// STEP 8: get opengraph cache
	var og = yield sessionDomain.getOpenGraphCache({
		session: this.session
		, cache: this.cache
	});

	if (!og) {
		this.flash = formError(
			this.i18n.t('error.opengraph-invalid-profile')
		);
		this.redirect('/c/' + slug);
		return;
	}

	if (og.image && og.image.length > 0) {
		og.image = og.image.map(function(img) {
			return img.secure_url || img.url;
		});
	}

	if (og.url) {
		og.site_url = parser(og.url);
		og.site_url = og.site_url.protocol + '//' + og.site_url.hostname + '/';
	}

	// STEP 9: create post
	yield clubsDomain.createClubPost({
		db: this.db
		, user: user
		, club: club
		, body: body
		, data: og
	});

	yield sessionDomain.clearOpenGraphCache({
		session: this.session
		, cache: this.cache
	});

	this.redirect('/c/' + slug);
};
