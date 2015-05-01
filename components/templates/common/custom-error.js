
/**
 * custom-error.js
 *
 * Template for generic custom error
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
	var error = h('div.error', [
		h('p.line', data.error_status)
		, h('p.line', data.error_message)
	]);

	return error;
};
