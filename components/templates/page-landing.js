
/**
 * page-landing.js
 *
 * Template for landing page body
 */

var h = require('virtual-dom/h');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var main = h('div.page', 'hello world');

	return main;
};
