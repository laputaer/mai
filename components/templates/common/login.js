
/**
 * login.js
 *
 * Template for user login screen
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
	var i18n = data.i18n;
	var login = $('div.m-section', [
		$('p.m-subtitle', i18n.t('placeholder.login'))
		, $('p.m-line', i18n.t('error.login-required'))
		, $('p.m-line', data.login)
	]);

	return login;
};