
/**
 * local-development.js
 *
 * Local development environment setup
 */

var compose = require('koa-compose');
var livereload = require('koa-livereload');
var asset = require('koa-static');

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   String  env  Environment name
 * @return  MW
 */
function factory(env) {
	var tools = [];

	// livereload server
	if (env === 'development') {
		tools.push(livereload({
			src: 'https://mai.dev:30001/livereload.js?snipver=1'
		}));
	}

	// static asset
	if (env === 'development' || env === 'local') {
		tools.push(asset('public'));
	}

	return compose(tools);
};
