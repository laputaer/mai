
/**
 * create-stash-item.js
 *
 * API for stash item creation
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var stashDomain = require('../domains/stash');
var sessionDomain = require('../domains/session');
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
	debug(body);
	body = normalize(body, 'stashItem');
	debug(body);
	result = yield validate(body, 'stashItem');
	debug(result);

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 4: check for duplicate url
	var exist = yield stashDomain.matchItemUrl({
		db: this.db
		, user: this.session.uid
		, url: body.url
	});

	if (exist && !exist.deleted) {
		this.state.error_json = getStandardJson(result, 409, i18n.t('error.stash-item-already-exist'));
		return;
	}

	// STEP 5: refresh item or create item
	var item;
	if (exist && exist.deleted) {
		// refresh deleted item
		item = yield stashDomain.refreshItem({
			db: this.db
			, sid: exist.sid
			, uid: exist.user
		});
	} else {
		// create new item
		item = yield stashDomain.createItem({
			db: this.db
			, user: this.session.uid
			, body: body
		});
	}

	mixpanelDomain.stashAdd({
		mixpanel: this.mixpanel
		, request: this.request
		, user: item.user
		, item: item.sid
		, type: 'web'
	});

	// STEP 6: output json
	this.state.json = getStandardJson(filterAttributes(item, filter_output));
};
