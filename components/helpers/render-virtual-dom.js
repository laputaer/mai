
/**
 * remove-trailing-slash.js
 *
 * For removing extra slashes at the end of path
 */

var stringify = require('vdom-to-html');
var beautify = require('js-beautify').html;

module.exports = helper;

/**
 * Helper
 *
 * @param   VNode   vnode  Virtual DOM node
 * @param   Object  opts   Custom options
 * @return  String
 */
function helper(vnode, opts) {
	var html = '<!DOCTYPE html>' + stringify(vnode);

	if (opts.format) {
		html = beautify(html, {
			preserve_newlines: false
		});
	}

	return html;
};
