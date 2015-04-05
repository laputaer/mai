
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
	var nav = h('ul.nav', data.menu_nav.map(function(button) {
		return h('li.item', button);
	}));

	var login;
	if (!data.menu_user) {
		login = h('ul.login', data.menu_login.map(function(button) {
			return h('li.item', button);
		}));
	} else {
		login = data.menu_user;
	}


	var menu = h('div.menu', [nav, login]);

	return menu;
};