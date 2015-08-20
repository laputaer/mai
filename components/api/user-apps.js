
/**
 * user-apps.js
 *
 * API for getting user app profiles
 */

var parser = require('url').parse;

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var stashDomain = require('../domains/stash');

var proxyUrl = require('../security/proxy');
var validate = require('../security/validation');

var filter_output = [
	'aid', 'name', 'user'
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

	// STEP 2: prepare common data
	var limit = 8;
	var skip = 0;

	var result = yield validate(this.request.query, 'query');
	if (result.valid) {
		limit = parseInt(this.request.query.limit) || limit;
		skip = parseInt(this.request.query.skip) || skip;
	}

	// STEP 3: find app profiles
	var apps = yield usersDomain.getUserApps({
		db: this.db
		, user: this.session.uid
		, limit: limit
		, skip: skip
	});

	// STEP 4: prepare output
	apps = apps.map(function (item) {
		// filter output
		return filterAttributes(item, filter_output);
	});

	// STEP 5: output json
	this.state.json = getStandardJson(apps);
};
