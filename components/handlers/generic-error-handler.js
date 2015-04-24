
/**
 * generic-error-handler.js
 *
 * Handle unexpected errors
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
	yield next;

	// prepare common data
	var data = builders.prepareData(this);
	// TODO: better error response
	data.body.push(builders.internalError(data));

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
