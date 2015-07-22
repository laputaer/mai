
/**
 * output-renderer.js
 *
 * Handle vdom and json output conversion
 */

var stringify = require('vdom-to-html');
var beautify = require('js-beautify').html;
var inline_elements = require('inline-elements');
var unformatted = inline_elements.concat('style');

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

	if (this.state.vdoc) {
		// render html
		var html = '<!DOCTYPE html>' + stringify(this.state.vdoc);

		// format output
		if (this.config.output.format) {
			html = beautify(html, {
				preserve_newlines: false
				, unformatted: unformatted
			});
		}

		this.body = html;
	} else if (this.state.json) {
		// format and output
		this.type = 'json';
		this.set('Cache-Control', 'no-cache, no-store, must-revalidate');
		this.body = JSON.stringify(this.state.json, null, '\t');
	}
};
