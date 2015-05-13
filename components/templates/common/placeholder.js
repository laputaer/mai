
/**
 * placeholder.js
 *
 * Template for placeholder container
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
	var placeholder = h('div.m-rows', [
		h('div.m-row-2.m-content.placeholder', data.content)
	]);

	return placeholder;
};