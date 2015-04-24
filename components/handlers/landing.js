
/**
 * landing.js
 *
 * Koa route handler for landing page
 */

var builders = require('../builders/builders');
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

	// prepare common data
	var data = builders.prepareData(this);
	data.body.push(builders.landing(data));

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
