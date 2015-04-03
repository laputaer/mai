
/**
 * create.js
 *
 * Process user input to create a club
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
	opts.version = this.config.version;
	opts.body = [];
	opts.body.push(builders.landing(opts));

	// render doc
	var vdoc = builders.doc(opts);
	this.body = renderVNode(vdoc, {
		format: true
	});
};