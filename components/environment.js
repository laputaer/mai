
/**
 * environment.js
 *
 * Setup environment specific koa components
 */

var livereload = require('koa-livereload');
var asset = require('koa-static');

module.exports = factory;

/**
 * Environment manager
 *
 * @param   Object  app  Koa object
 * @return  Void
 */
function factory(app) {
	// livereload server
	if (app.env === 'development') {
		app.use(livereload({
			src: 'https://mai.dev:30001/livereload.js?snipver=1'
		}));
	}

	// static asset
	if (app.env === 'development' || app.env === 'local') {
		app.use(asset('public', {
			maxage: 1000 * 60 * 60 * 24
		}));
	}

	// base url
	app.use(function *(next) {
		if (this.app.env === 'production') {
			this.state.base_url = this.config.server.cdn_url;
		} else if (this.app.env === 'development' || this.app.env === 'local') {
			this.state.base_url = this.config.server.base_url;
		} else {
			this.state.base_url = '';
		}

		yield next;
	});
};
