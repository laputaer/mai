
/**
 * delete-app-password.js
 *
 * API for stash item removal
 */

var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();

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

	// STEP 3: make sure item exist
	var profile = yield usersDomain.matchAppName({
		db: this.db
		, user: this.session.uid
		, name: this.params.name
	});

	if (!profile) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-app-password'));
		return;
	}

	// STEP 4: remove item
	yield usersDomain.removeAppPassword({
		db: this.db
		, aid: profile.aid
	});

	// STEP 5: output json
	this.state.json = getStandardJson(null, 200, i18n.t('message.common.action-done'));
};
