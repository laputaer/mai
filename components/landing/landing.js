
/**
 * landing.js
 *
 * Koa route handler for landing page
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

	// prepare data
	var opts = {};
	opts.i18n = i18n('zh-CN');
	opts.parts = builders.landing(opts);

	// render vdom
	var vdoc = builders.doc(opts);

	// output html string
	this.body = renderVNode(vdoc, {
		format: true
	});
};
