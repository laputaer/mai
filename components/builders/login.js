
/**
 * login.js
 *
 * Render login screen for guest users
 */

var buttonTemplate = require('../templates/common/button');
var loginTemplate = require('../templates/common/login');
var placeholderTemplate = require('../templates/common/placeholder');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var i18n = data.i18n;
	data.login = [
		{ type: ['large', 'twitter'], href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), version: data.version.asset }
		, { type: ['large', 'github'], href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), version: data.version.asset }
	];
	data.login = data.login.map(buttonTemplate);
	data.placeholder = placeholderTemplate({ content: loginTemplate(data) });

	return bodyBuilder(data);
};
