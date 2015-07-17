
/**
 * api-global-config.js
 *
 * API for getting current user profile
 */

var getStandardJson = require('../helpers/get-standard-json');

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

	var config = {
		version: this.config.version
		, locale: this.locale
		, base_url: this.state.base_url
	};

	// STEP 1: output json
	this.state.json = getStandardJson(config);
};
