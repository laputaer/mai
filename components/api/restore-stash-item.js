
/**
 * restore-stash-item.js
 *
 * API for stash item restore
 */

var getStandardJson = require('../helpers/get-standard-json');
var i18n = require('../templates/i18n')();

var stashDomain = require('../domains/stash');
var sessionDomain = require('../domains/session');

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
	var item = yield stashDomain.matchItem({
		db: this.db
		, sid: this.params.sid
	});

	if (!item) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-stash-item'));
		return;
	}

	if (item.user !== this.session.uid) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.access-control'));
		return;
	}

	if (!item.deleted) {
		this.state.error_json = getStandardJson(null, 409, i18n.t('error.duplicate-action'));
		return;
	}

	// STEP 4: restore item
	yield stashDomain.restoreItem({
		db: this.db
		, sid: item.sid
		, uid: item.user
	});

	// STEP 5: output json
	this.state.json = getStandardJson(null, 200, i18n.t('message.common.action-done'));
};
