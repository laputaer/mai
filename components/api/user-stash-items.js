
/**
 * user-stash-items.js
 *
 * API for getting user stash items
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
	'sid', 'user', 'url', 'title', 'favicon'
	, 'domain'
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

	// STEP 2: find user
	var user = yield usersDomain.matchUser({
		db: this.db
		, uid: this.params.uid
	});

	if (!user) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-user'));
		return null;
	}

	if (user.uid !== this.session.uid) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.access-control'));
		return;
	}

	// STEP 3: prepare common data
	var limit = 8;
	var range = 0;

	var result = yield validate(this.request.query, 'query');
	if (result.valid) {
		limit = parseInt(this.request.query.limit) || limit;
		range = parseInt(this.request.query.range) || range;
	}

	// STEP 4: find stash items
	var items = yield stashDomain.getUserItems({
		db: this.db
		, uid: this.session.uid
		, limit: limit
		, range: range
	});

	// STEP 5: prepare output
	var config = this.config;
	var state = this.state;

	items = items.map(function (item) {
		// favicon
		if (item.favicon) {
			item.favicon = proxyUrl({
				url: item.favicon
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		// domain
		if (item.url) {
			var url = parser(item.url);
			item.domain = url.hostname;
		}

		// filter output
		return filterAttributes(item, filter_output);
	});

	// STEP 6: output json
	this.state.json = getStandardJson(items);
};
