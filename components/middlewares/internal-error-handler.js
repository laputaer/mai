
/**
 * internal-error-handler.js
 *
 * Handle server responses when critical services are down, like database
 */

var builders = require('../builders/builders');

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
	// normally this is noop
	if (this.db !== false && this.cache !== false) {
		yield next;
		return;
	}

	// when internal service is down, stop yielding next

	// prepare data
	var data = {};
	data.i18n = this.i18n;
	data.version = this.config.version;
	data.body = [];
	data.body.push(builders.internalError(data));

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
