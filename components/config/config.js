
/**
 * config.js
 *
 * Merge and export config object
 */

var extend = require('deep-extend');
var configDefault = require('./default');

// allow custom config file
var configCustom = {};
try {
	configCustom = require('./custom');
} catch(err) {
	configCustom = {};
}

var config = extend(configDefault, configCustom);

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   Boolean  flag  Return config object or middleware
 * @return  Mixed
 */
function factory(flag) {
	if (!flag) {
		return config;
	}

	return middleware;
};

/**
 * Koa middleware
 *
 * @param   Function  next  Flow control
 * @return  Void
 */
function *middleware(next) {
	this.config = config;
	yield next;
};
