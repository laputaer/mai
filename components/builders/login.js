
/**
 * login.js
 *
 * Render login screen for guest users
 */

var templates = require('../templates/index');
var i18n = require('../templates/i18n')();

module.exports = renderer;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function renderer(data) {
	data.login = [];
	data.login.push(templates.common.button({
		type: ['medium', 'twitter']
		, href: '/connect/twitter'
		, icon: 'twitter'
		, text: i18n.t('menu.login.twitter')
		, version: data.version.asset
		, base_url: data.base_url
	}));
	data.login.push(templates.common.button({
		type: ['medium', 'github']
		, href: '/connect/github'
		, icon: 'github'
		, text: i18n.t('menu.login.github')
		, version: data.version.asset
		, base_url: data.base_url
	}));
	data.content = templates.common.login(data);
	data.placeholder = templates.common.placeholder(data);

	return data;
};
