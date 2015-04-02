
/**
 * home.js
 *
 * Koa route handler for home
 */

var builders = require('../builders/builders');
var i18n = require('../i18n/i18n');

var findUser = require('./find-user');

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
	opts.user = yield findUser.apply(this);
	opts.parts = builders.landing(opts);

	// render vdom
	var vdoc = builders.doc(opts);

	// output html string
	this.body = renderVNode(vdoc, {
		format: true
	});
};
