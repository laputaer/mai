
/**
 * menu.js
 *
 * Template for default navigation menu
 */

var $ = require('../vdom');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var hint = $('ul.page-menu-group.hint', data.menu_hint.map(function(button) {
		return $('li.page-menu-item', button);
	}));

	var nav = $('ul.page-menu-group.nav', data.menu_nav.map(function(button) {
		return $('li.page-menu-item', button);
	}));

	var user = $('ul.page-menu-group.user', data.menu_user.map(function(button) {
		return $('li.page-menu-item', button);
	}));

	var menu = $('div.page-menu', [hint, nav, user]);

	return menu;
};