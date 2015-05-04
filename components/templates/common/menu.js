
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
	var hint = h('ul.hint', data.menu_hint.map(function(button) {
		return h('li.item', button);
	}));

	var nav = h('ul.nav', data.menu_nav.map(function(button) {
		return h('li.item', button);
	}));

	var user = h('ul.user', data.menu_user.map(function(button) {
		return h('li.item', button);
	}));

	var menu = h('div.menu', [hint, nav, user]);

	return menu;
};