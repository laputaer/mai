
/**
 * template-renderer.js
 *
 * Handle vnode to html output conversion
 */

var stringify = require('vdom-to-html');
var beautify = require('js-beautify').html;
var inline_elements = require('inline-elements');
var unformatted = inline_elements.concat('style', 'script');

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

	// upstream didn't set vnode to render
	if (!this.state.vdoc) {
		return;
	}

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
};
