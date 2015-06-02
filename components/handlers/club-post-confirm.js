
/**
 * club-post-confirm.js
 *
 * Koa route handler for club post confirmation page
 */

var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var createError = require('../helpers/create-error-message');
var formError = require('../helpers/create-form-message');
var proxyUrl = require('../security/proxy');

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
	var config = this.config;
	var state = this.state;

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

	// STEP 5: get opengraph cache
	data.embed = yield sessionDomain.getOpenGraphCache({
		session: this.session
		, cache: this.cache
	});

	if (!data.embed) {
		this.flash = formError(
			this.i18n.t('error.opengraph-invalid-profile')
		);
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 6: transform opengraph data for output
	if (data.embed.image && data.embed.image.length > 0) {
		data.embed.image = data.embed.image.map(function(img) {
			var url = img.secure_url || img.url;
			return proxyUrl({
				url: url
				, key: config.proxy.key
				, basE: state.image_base_url
			});
		});
	}

	if (data.embed.url) {
		data.embed.site_url = parser(data.embed.url);
		data.embed.site_url = data.embed.site_url.protocol + '//' + data.embed.site_url.hostname + '/';
	}

	// STEP 7: render page
	this.state.vdoc = builder(data);
};
