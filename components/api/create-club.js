
/**
 * create-club.js
 *
 * API for creating club
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

	// STEP 3: input validation
	result = yield validate(body, 'club');

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 4: check user action point
	var user = yield usersDomain.matchUser({
		db: this.db
		, uid: this.session.uid
	});

	if (user.action_point < 10) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.insufficient-action-point', {
			required: 10
			, current: user.action_point
		}));
		return;
	}

	// STEP 5: find existing club
	var exist = yield clubsDomain.matchClub({
		db: this.db
		, slug: body.slug
	});

	if (exist) {
		this.state.error_json = getStandardJson({ slug: true }, 409, i18n.t('error.club-already-exist'));
		return;
	}

	// STEP 6: create new club
	var club = yield clubsDomain.createClub({
		db: this.db
		, user: user
		, data: body
	});

	mixpanelDomain.clubCreate({
		mixpanel: this.mixpanel
		, club: club
		, request: this.request
	});

	// STEP 7: output json
	this.state.json = getStandardJson(filterAttributes(club, filter_output));
};
