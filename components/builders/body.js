
/**
 * body.js
 *
 * Render common body components
 */

var templates = require('../templates/index');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	var i18n = data.i18n;

	// heading
	data.heading = templates.common.heading(data);

	// menu partials
	data.menu_hint = [
		{ href: '/', icon: 'squares', text: i18n.t('menu.nav.toggle'), version: data.version.asset, type: ['navigation'] }
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
		{ href: '/', icon: 'home', text: i18n.t('menu.nav.home'), version: data.version.asset, type: ['navigation'] }
		, { href: '/c', icon: 'heart', text: i18n.t('menu.nav.club'), version: data.version.asset, type: ['navigation'] }
		, { href: '/ranking', icon: 'graph_rising', text: i18n.t('menu.nav.ranking'), version: data.version.asset, type: ['navigation'] }
		, { href: '/help', icon: 'compass', text: i18n.t('menu.nav.help'), version: data.version.asset, type: ['navigation'] }
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
			{ href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), version: data.version.asset, type: ['navigation'] }
			, { href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), version: data.version.asset, type: ['navigation'] }
		];
		data.menu_user = data.menu_user.map(templates.common.button);
	} else {
		data.menu_user = [ templates.common.simpleUser(data) ];
	}

	data.menu = templates.common.menu(data);
	data.body = templates.body(data);

	return data;
};
