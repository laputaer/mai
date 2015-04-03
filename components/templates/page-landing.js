
/**
 * page-landing.js
 *
 * Template for landing page body
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
	var main = h('div.page-landing', [
		data.heading
		, data.menu
		, data.placeholder
	]);

	return main;
};
