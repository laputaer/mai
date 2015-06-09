
/**
 * club-post-start.js
 *
 * Koa route handler for post creation
 */

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var embedDomain = require('../domains/embed');
var mixpanelDomain = require('../domains/mixpanel');
var validate = require('../security/validation');
var normalize = require('../security/normalization');
var formError = require('../helpers/create-form-message');
var debug = require('debug')('mai:post');
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
			i18n.t('error.membership-required-to-post')
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
			i18n.t('error.insufficient-action-point', {
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
			i18n.t('error.invalid-csrf-token')
			, body
		);
		this.redirect('/c/' + slug + '/p/post-add');
		return;
	}

	// STEP 7: input validation
	result = yield validate(body, 'postStart');

	if (!result.valid) {
		this.flash = formError(
			i18n.t('error.form-input-invalid')
			, body
			, result.errors
		);
		this.redirect('/c/' + slug + '/p/post-add');
		return;
	}

	// STEP 8: get opengraph data
	var embed, ua;
	try {
		ua = config.request.user_agent;
		for (var prop in config.fake_fetch_ua) {
			if (config.fake_fetch_ua.hasOwnProperty(prop)) {
				if (body.link.indexOf(prop) > -1) {
					ua = config.fake_fetch_ua[prop];
				}
			}
		}

		embed = yield embedDomain.getOpenGraphProfile({
			url: body.link
			, user_agent: ua
			, follow: config.request.follow
			, timeout: config.request.timeout
			, size: config.request.size
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (!embed) {
		this.flash = formError(
			i18n.t('error.opengraph-error-response')
			, body
			, ['link']
		);
		this.redirect('/c/' + slug + '/p/post-add');
		return;
	}

	debug(embed);

	// STEP 9: normalize and validate data
	embed = normalize(embed, 'opengraph');

	debug(embed);

	result = yield validate(embed, 'opengraph');

	debug(result);

	if (!result.valid) {
		this.flash = formError(
			i18n.t('error.opengraph-invalid-profile')
			, body
			, ['link']
		);
		this.redirect('/c/' + slug + '/p/post-add');
		return;
	}

	// STEP 10: put opengraph data in cache
	yield sessionDomain.setOpenGraphCache({
		session: this.session
		, cache: this.cache
		, embed: embed
	});

	mixpanelDomain.postPreview({
		mixpanel: this.mixpanel
		, request: this.request
		, club: club
		, user: user
		, embed: embed
	});

	this.redirect('/c/' + slug + '/p/post-add-2');
};
