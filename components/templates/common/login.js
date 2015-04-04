
/**
 * login.js
 *
 * Template for user login screen
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
	var login = h('div.login', [
		h('ul.list', data.login.map(function(button) {
			return h('li.item', button);
		}))
		, h('p.line', i18n.t('main.login'))
	]);

	return login;
};