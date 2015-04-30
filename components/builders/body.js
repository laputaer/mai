
/**
 * body.js
 *
 * Render common body components
 */

var bodyTemplate = require('../templates/body');
var headingTemplate = require('../templates/common/heading');
var menuTemplate = require('../templates/common/menu');
var buttonTemplate = require('../templates/common/button');
var userTemplate = require('../templates/common/simple-user');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var i18n = data.i18n;

	// heading
	data.heading = headingTemplate(data);

	// menu partials
	data.menu_nav = [
		{ href: '/', icon: 'squares', text: i18n.t('menu.nav.toggle'), version: data.version.asset, type: ['navigation'] }
		, { href: '/', icon: 'home', text: i18n.t('menu.nav.home'), version: data.version.asset, type: ['navigation'] }
		, { href: '/club', icon: 'heart', text: i18n.t('menu.nav.club'), version: data.version.asset, type: ['navigation'] }
		, { href: '/ranking', icon: 'graph_rising', text: i18n.t('menu.nav.ranking'), version: data.version.asset, type: ['navigation'] }
		, { href: '/help', icon: 'compass', text: i18n.t('menu.nav.help'), version: data.version.asset, type: ['navigation'] }
	];
	data.menu_nav = data.menu_nav.map(function(button) {
		if (data.path === button.href) {
			button.type.push('active');
		}
		return button;
	});
	data.menu_nav = data.menu_nav.map(buttonTemplate);

	// menu login for guest user
	if (!data.current_user) {
		data.menu_user = [
			{ href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), version: data.version.asset, type: ['navigation'] }
			, { href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), version: data.version.asset, type: ['navigation'] }
		];
		data.menu_user = data.menu_user.map(buttonTemplate);
	// profile link for local user
	} else {
		data.menu_user = [ userTemplate(data) ];
	}

	data.menu = menuTemplate(data);

	return bodyTemplate(data);
};
