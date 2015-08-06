
/**
 * init-post.js
 *
 * API for first step of post creation
 */

var parser = require('url').parse;

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var embedDomain = require('../domains/embed');
var mixpanelDomain = require('../domains/mixpanel');

var validate = require('../security/validation');
var normalize = require('../security/normalization');
var proxyUrl = require('../security/proxy');
var debug = require('debug')('mai:post');

var filter_output = [
	'pid', 'title', 'summary'
	, 'user', 'user_name', 'user_login', 'user_avatar'
	, 'club', 'club_name', 'club_image', 'club_intro'
	, 'domain', 'url', 'image', 'doc_title', 'doc_summary'
	, 'fav_point', 'current_user_fav'
];

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

	// STEP 1: handle guest user
	if (!this.session.uid) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.login-required'));
		return;
	}

	// STEP 2: csrf validation
	var body = this.request.body;
	var result = yield sessionDomain.verifyCsrfToken({
		session: this.session
		, cache: this.cache
		, token: body.csrf_token
	});

	if (!result) {
		this.state.error_json = getStandardJson(null, 403, i18n.t('error.invalid-csrf-token'));
		return;
	}

	// STEP 3: input validation
	result = yield validate(body, 'postStart');

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 4: check user action point
	var user = yield usersDomain.matchUser({
		db: this.db
		, uid: this.session.uid
	});

	if (user.action_point < 1) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.insufficient-action-point', {
			required: 1
			, current: user.action_point
		}));
		return;
	}

	// STEP 5: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (!club) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-club'));
		return;
	}

	// STEP 6: check membership
	var membership = yield clubsDomain.matchMembership({
		db: this.db
		, uid: user.uid
		, slug: club.slug
	});

	if (!membership) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.membership-required-to-post'));
		return;
	}

	// STEP 7: get opengraph data
	var config = this.config;
	var embed, ua;

	try {
		// some site only allow googlebot
		ua = config.request.user_agent;
		for (var prop in config.fake_fetch_ua) {
			if (config.fake_fetch_ua.hasOwnProperty(prop)) {
				if (body.link.indexOf(prop) > -1) {
					ua = config.fake_fetch_ua[prop];
				}
			}
		}

		// fetch page
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
		this.state.error_json = getStandardJson({ link: true }, 500, i18n.t('error.opengraph-error-response'));
		return;
	}

	// STEP 8: normalize and validate data
	debug(embed);
	embed = normalize(embed, 'opengraph');
	debug(embed);
	result = yield validate(embed, 'opengraph');
	debug(result);

	if (!result.valid) {
		this.state.error_json = getStandardJson({ link: true }, 500, i18n.t('error.opengraph-invalid-profile'));
		return;
	}

	// STEP 9: put opengraph data in cache
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

	// STEP 10: build output
	var state = this.state;
	var output = {
		pid: 'club-post-preview'
		, title: ''
		, summary: ''
		, user: user.uid
		, user_name: user.name
		, user_login: user.login
		, club: club.slug
		, club_name: club.title
		, club_intro: club.intro
		, fav_point: 0
		, current_user_fav: false
	};

	if (user.avatar) {
		output.user_avatar = proxyUrl({
			url: user.avatar
			, key: config.proxy.key
			, base: state.image_base_url
		});
	}

	if (club.embed
		&& Array.isArray(club.embed.image)
		&& club.embed.image.length > 0
	) {
		var image = club.embed.image[0];
		output.club_image = proxyUrl({
			url: image.secure_url || image.url
			, key: config.proxy.key
			, base: state.image_base_url
		});
	}

	if (embed) {
		// thumbnail
		if (Array.isArray(embed.image) && embed.image.length > 0) {
			var image = embed.image[0];
			output.image = proxyUrl({
				url: image.secure_url || image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		// title
		if (embed.title) {
			output.doc_title = embed.title;
		}

		// description
		if (embed.description) {
			output.doc_summary = embed.description.substr(0, 60) + '...';
		}

		// link and external domain
		if (embed.url) {
			var url = parser(embed.url);
			output.url = embed.url;
			output.domain = url.hostname;
		}
	}

	// STEP 11: output json
	this.state.json = getStandardJson(filterAttributes(output, filter_output));
};
