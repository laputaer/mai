
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
	var error = h('div.m-box', [
		h('p.line', i18n.t(data.flash.message))
	]);

	return error;
};