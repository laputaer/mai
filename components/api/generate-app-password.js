
/**
 * generate-app-password.js
 *
 * API for generating app password
 */

var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var sessionDomain = require('../domains/session');
var mixpanelDomain = require('../domains/mixpanel');

var validate = require('../security/validation');

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

	// STEP 3: input transform and validation
	result = yield validate(body, 'appPassword');

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 4: make sure app name doesn't exist
	var exist = yield usersDomain.matchAppName({
		db: this.db
		, user: this.session.uid
		, name: body.name
	});

	if (exist) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.duplicate-action'));
		return;
	}

	// STEP 5: create password
	var pass = yield usersDomain.createAppPassword({
		db: this.db
		, user: this.session.uid
		, name: body.name
	});

	mixpanelDomain.appConnect({
		mixpanel: this.mixpanel
		, request: this.request
		, user: this.session.user
	});

	// STEP 6: prepare output
	var output = {
		user: this.session.uid
		, name: body.name
		, pass: pass
	};

	// STEP 7: output json
	this.state.json = getStandardJson(output);
};
