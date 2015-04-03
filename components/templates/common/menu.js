
/**
 * menu.js
 *
 * Template for default navigation menu
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
	var menu = h('div.menu', [
		h('ul.nav', data.nav)
		, h('ul.login', data.login)
	]);

	return menu;
};