
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
	var hint = h('ul.page-menu-group.hint', data.menu_hint.map(function(button) {
		return h('li.page-menu-item', button);
	}));

	var nav = h('ul.page-menu-group.nav', data.menu_nav.map(function(button) {
		return h('li.page-menu-item', button);
	}));

	var user = h('ul.page-menu-group.user', data.menu_user.map(function(button) {
		return h('li.page-menu-item', button);
	}));

	var menu = h('div.page-menu', [hint, nav, user]);

	return menu;
};