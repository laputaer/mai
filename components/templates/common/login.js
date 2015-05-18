
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
	var login = h('div.m-section', [
		h('p.m-subtitle', i18n.t('placeholder.login'))
		, h('p.m-line', i18n.t('error.login-required'))
		, h('p.m-line', data.login)
	]);

	return login;
};