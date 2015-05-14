
/**
 * page-help.js
 *
 * Koa route handler for user manual
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');

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

	// STEP 1: prepare common data
	var data = prepareData(this);

	// STEP 2: render page
	this.state.vdoc = builder(data);
};
