
/**
 * api-global-config.js
 *
 * API for getting current user profile
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');

var filter_output = [
	'uid', 'id', 'provider', 'login', 'name', 'avatar'
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

	// STEP 1: prepare common data
	var data = {
		version: this.config.version
		, locale: this.locale
		, base_url: this.state.base_url
		, production: this.state.production
	};

	if (this.session.uid) {
		data.current_user = filterAttributes(this.state.user, filter_output);
	}

	// STEP 2: output json
	this.state.json = getStandardJson(data);
};
