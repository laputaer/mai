
/**
 * app-create-stash-item.js
 *
 * API for stash item creation, for app api
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var stashDomain = require('../domains/stash');
var mixpanelDomain = require('../domains/mixpanel');

var validate = require('../security/validation');
var normalize = require('../security/normalization');
var proxyUrl = require('../security/proxy');
var debug = require('debug')('mai:stash');

var filter_output = [
	'sid', 'user', 'url', 'title'
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
	var result = yield validate(body, 'appToken');
	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	var token = body.token.split(':');

	// STEP 3: check app token
	var valid = yield usersDomain.matchAppToken({
		cache: this.cache
		, uid: token[0] || ''
		, aid: token[1] || ''
		, token: token[2] || ''
	});

	if (!valid) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.app-token-invalid'));
		return;
	}

	// STEP 4: input transform and validation
	debug(body);
	body = normalize(body, 'stashItem');
	debug(body);
	result = yield validate(body, 'stashItem');
	debug(result);

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 5: create item
	var item = yield stashDomain.createItem({
		db: this.db
		, user: token[0]
		, body: body
	});

	mixpanelDomain.stashAdd({
		mixpanel: this.mixpanel
		, request: this.request
		, user: item.user
		, item: item.sid
		, type: 'extension'
	});

	// STEP 6: output json
	this.state.json = getStandardJson(filterAttributes(item, filter_output));
};
