
/**
 * doc.js
 *
 * Render document
 */

var templates = require('../templates/index');
var i18n = require('../templates/i18n')();

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	// heading
	data.heading = templates.common.heading(data);

	// menu partials
	data.menu_hint = [
		{ href: '/', icon: 'squares', text: i18n.t('menu.nav.toggle'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
	];
	data.menu_hint = data.menu_hint.map(function(button) {
		if (data.current_path === button.href) {
			button.type.push('active');
		}
		return button;
	});
	data.menu_hint = data.menu_hint.map(templates.common.button);

	// menu partials
	data.menu_nav = [
		{ href: '/', icon: 'home', text: i18n.t('menu.nav.home'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
		, { href: '/c/club-home', icon: 'heart', text: i18n.t('menu.nav.club'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
		, { href: '/c/club-ranking', icon: 'graph_rising', text: i18n.t('menu.nav.ranking'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
		, { href: '/help', icon: 'compass', text: i18n.t('menu.nav.help'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
	];
	data.menu_nav = data.menu_nav.map(function(button) {
		if (data.current_path === button.href) {
			button.type.push('active');
		}
		return button;
	});
	data.menu_nav = data.menu_nav.map(templates.common.button);

	// menu partials
	if (!data.current_user) {
		data.menu_user = [
			{ href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
			, { href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), version: data.version.asset, type: ['navigation'], base_url: data.base_url }
		];
		data.menu_user = data.menu_user.map(templates.common.button);
	} else {
		data.menu_user = [ templates.common.simpleUser(data) ];
	}

	data.menu = templates.common.menu(data);
	data.head = templates.head(data);
	data.body = templates.body(data);

	return templates.doc(data);
};
