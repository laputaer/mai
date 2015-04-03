
/**
 * error-handler.js
 *
 * Handle server responses when critical services are down, like mongodb
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
	if (this.db !== false && this.redis !== false) {
		yield next;
		return;
	}

	// this part only run when internal services are down
	// note that we don't yield at the end, as there is no need for downstream to run

	// prepare data
	var opts = {};
	opts.i18n = i18n('zh-CN');
	opts.version = this.config.version;
	opts.internal_service_down = true;
	opts.parts = builders.landing(opts);

	// render vdom
	var vdoc = builders.doc(opts);

	// output html string
	this.body = renderVNode(vdoc, {
		format: true
	});
};
