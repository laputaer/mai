
/**
 * environment.js
 *
 * Setup environment specific koa components
 */

var fs = require('mz/fs');
var livereload = require('koa-livereload');
var asset = require('koa-static');
var inline_css, inline_js;

module.exports = factory;

/**
 * Environment manager
 *
 * @param   Object  app  Koa object
 * @return  Void
 */
function factory(app) {
	// livereload server
	if (app.env === 'dev') {
		app.use(livereload({
			src: 'https://mai.dev:30001/livereload.js?snipver=1'
		}));
	}

	// static asset
	if (app.env === 'dev' || app.env === 'local') {
		app.use(asset('public', {
			maxage: 1000 * 60 * 60 * 24
		}));
	}

	// base url, inline asset
	app.use(function *(next) {
		if (this.app.env === 'production') {
			this.state.base_url = this.config.server.cdn_url;
			this.state.production = true;
		} else if (this.app.env === 'local') {
			this.state.base_url = this.config.server.base_url;
			this.state.production = true;
		} else if (this.app.env === 'dev') {
			this.state.base_url = this.config.server.base_url;
			this.state.production = false;
		}

		if (this.config.server.image_base_url) {
			this.state.image_base_url = this.config.server.image_base_url;
		} else {
			this.state.image_base_url = this.state.base_url;
		}

		if (inline_css) {
			this.state.inline_css = inline_css;
		} else {
			inline_css = yield fs.readFile(process.cwd() + '/public/assets/inline.css');
			this.state.inline_css = inline_css;
		}

		if (inline_js) {
			this.state.inline_js = inline_js;
		} else {
			inline_js = yield fs.readFile(process.cwd() + '/public/assets/inline.js');
			this.state.inline_js = inline_js;
		}

		yield next;
	});
};
