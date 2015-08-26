
/**
 * create-app-password.js
 *
 * API for generating app password
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var sessionDomain = require('../domains/session');
var mixpanelDomain = require('../domains/mixpanel');

var validate = require('../security/validation');

var filter_output = [
	'aid', 'user', 'name', 'pass'
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

	// STEP 3: input transform and validation
	result = yield validate(body, 'appName');

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

	if (exist && !exist.deleted) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.app-name-already-exist'));
		return;
	}

	// STEP 5: refresh app or create app
	var profile;
	if (exist && exist.deleted) {
		// refresh deleted app
		profile = yield usersDomain.refreshAppPassword({
			db: this.db
			, aid: exist.aid
		});
	} else {
		// create new app
		profile = yield usersDomain.createAppPassword({
			db: this.db
			, user: this.session.uid
			, name: body.name
		});
	}

	mixpanelDomain.appConnect({
		mixpanel: this.mixpanel
		, request: this.request
		, user: profile.user
	});

	// STEP 6: output json
	this.state.json = getStandardJson(filterAttributes(profile, filter_output));
};
