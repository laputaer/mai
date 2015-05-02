
/**
 * form-error.js
 *
 * Template for generic form errors
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;
	var flash = data.flash;

	if (!flash) {
		return;
	}

	var error = h('div.m-box.error', [
		h('p.line', flash.message)
	]);

	return error;
};