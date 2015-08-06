
/**
 * create-post.js
 *
 * API for second step of post creation
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var mixpanelDomain = require('../domains/mixpanel');

var validate = require('../security/validation');

var filter_output = [
	'slug', 'title'
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
	result = yield validate(body, 'postConfirm');

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

	// STEP 7: get opengraph cache
	var embed = yield sessionDomain.getOpenGraphCache({
		session: this.session
		, cache: this.cache
	});

	if (!embed) {
		this.state.error_json = getStandardJson(null, 500, i18n.t('error.opengraph-invalid-profile'));
		return;
	}

	// STEP 8: create post
	yield clubsDomain.createClubPost({
		db: this.db
		, user: user
		, club: club
		, body: body
		, embed: embed
	});

	yield sessionDomain.clearOpenGraphCache({
		session: this.session
		, cache: this.cache
	});

	mixpanelDomain.postCreate({
		mixpanel: this.mixpanel
		, request: this.request
		, club: club
		, user: user
		, embed: embed
		, body: body
	});

	// STEP 9: output json
	this.state.json = getStandardJson(filterAttributes(club, filter_output));
};
