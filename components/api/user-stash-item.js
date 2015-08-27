
/**
 * user-stash-item.js
 *
 * API for getting a single user stash item
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var usersDomain = require('../domains/users');
var stashDomain = require('../domains/stash');

var validate = require('../security/validation');

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
	// optional flow control, so this can be used as component
	if (next) {
		yield next;
	}

	// STEP 1: handle query or request
	var stash_id;
	if (next) {
		stash_id = this.params.sid;
	} else {
		var result = yield validate(this.request.query, 'query');
		if (result.valid) {
			stash_id = this.request.query.stash || '';
		}
	}

	// STEP 2: find stash items
	var stash_item = yield stashDomain.matchItem({
		db: this.db
		, sid: stash_id
	});

	// STEP 3: handle guest user and ownership issue
	if (!stash_item || stash_item.user !== this.session.uid) {
		stash_item = {};
	}

	stash_item = filterAttributes(stash_item, filter_output);

	if (!next) {
		return stash_item;
	}

	// STEP 4: output json
	this.state.json = getStandardJson(stash_item);
};
