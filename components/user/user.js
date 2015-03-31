
/**
 * user.js
 *
 * Koa route handler for user login
 */

var removeSlash = require('../helpers/remove-trailing-slash');

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

	opts = {};
	opts.path = removeSlash(this.path);
	opts.params = this.params;

	this.body = opts;
};
