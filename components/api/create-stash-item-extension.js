
/**
 * create-stash-item-extension.js
 *
 * API for stash item creation, for browser extensions
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
	'sid', 'user', 'url', 'title', 'favicon'
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
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-type-invalid'));
		return;
	}

	// STEP 2: input transform and validation
	var body = this.request.body;
	debug(body);
	body = normalize(body, 'stashItem');
	debug(body);
	var result = yield validate(body, 'stashItem');
	debug(result);

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 3: check auth token
	var valid = yield usersDomain.matchAppPassword({
		db: this.db
		, user: body.user || ''
		, name: body.name || ''
		, pass: body.pass || ''
	});
	if (!valid) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.access-control'));
		return;
	}

	// STEP 4: create item
	var item = yield stashDomain.createItem({
		db: this.db
		, user: body.user
		, body: body
	});

	mixpanelDomain.stashAdd({
		mixpanel: this.mixpanel
		, request: this.request
		, user: body.user
		, item: item.sid
		, type: 'extension'
	});

	// STEP 5: prepare output
	var config = this.config;
	var state = this.state;
	var output = {
		sid: item.sid
		, user: item.user
		, url: item.url
		, title: item.title
	};

	if (item.favicon) {
		output.favicon = proxyUrl({
			url: item.favicon
			, key: config.proxy.key
			, base: state.image_base_url
		});
	}

	// STEP 6: output json
	this.state.json = getStandardJson(filterAttributes(output, filter_output));
};
