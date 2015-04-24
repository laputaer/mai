
/**
 * unexpected-error-handler.js
 *
 * Handle uncommon errors throw by route handlers (say db query failure)
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
	try {
		yield next;
	} catch (err) {
		this.app.emit('error', err, this);

		// server error
		this.status = err.status || 500;

		// prepare common data
		var data = builders.prepareData(this);

		// generic error page
		data.body.push(builders.internalError(data));

		// render vdoc
		this.state.vdoc = builders.doc(data);
	}
};
