
/**
 * join-club.js
 *
 * API for creating a club membership
 */

var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();

var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
var sessionDomain = require('../domains/session');
var mixpanelDomain = require('../domains/mixpanel');

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
	if (!this.state.user) {
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

	// STEP 3: check user action point
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

	// STEP 4: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (!club) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-club'));
		return;
	}

	// STEP 5: check membership
	var membership = yield clubsDomain.matchMembership({
		db: this.db
		, uid: user.uid
		, slug: club.slug
	});

	if (membership) {
		this.state.error_json = getStandardJson(null, 409, i18n.t('error.duplicate-club-join'));
		return;
	}

	// STEP 6: join club
	yield clubsDomain.joinClub({
		db: this.db
		, club: club
		, user: user
	});

	mixpanelDomain.clubJoin({
		mixpanel: this.mixpanel
		, user: user
		, club: club
		, request: this.request
	});

	// STEP 7: output json
	this.state.json = getStandardJson(null, 200, i18n.t('message.common.action-done'));
};
