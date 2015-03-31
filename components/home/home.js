
/**
 * home.js
 *
 * Koa route handler for home
 */

var builders = require('../builders/builders');
var i18n = require('../i18n/i18n');

var renderVNode = require('../helpers/render-virtual-dom');

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

	this.body = this.session.id || 'unknown';
};
