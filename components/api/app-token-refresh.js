
/**
 * app-token-refresh.js
 *
 * API for refresh app token, using app password
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var validate = require('../security/validation');

var filter_output = [
	'user', 'app', 'token', 'expire'
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

	// STEP 1: check request type
	var type = this.request.type;
	if (type !== 'application/json') {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.request-type-invalid'));
		return;
	}

	// STEP 2: check request body
	var body = this.request.body;
	var result = yield validate(body, 'appPassword');
	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	var pass = body.password.split(':');

	// STEP 3: check app password
	var profile = yield usersDomain.matchAppPassword({
		db: this.db
		, aid: pass[0] || ''
		, password: pass[1] || ''
	});

	if (!profile) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.app-password-invalid'));
		return;
	}

	// STEP 4: create new app token
	var token = yield usersDomain.createAppToken({
		cache: this.cache
		, uid: profile.user
		, aid: profile.aid
	});

	// STEP 5: output json
	this.state.json = getStandardJson(filterAttributes(token, filter_output));
};
