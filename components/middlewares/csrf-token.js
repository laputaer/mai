
/**
 * csrf-token.js
 *
 * Automatically generate CSRF token and secret for input validation
 */

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
};
