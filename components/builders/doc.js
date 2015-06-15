
/**
 * doc.js
 *
 * Render document
 */

var I = require('icepick');

var immutable = require('./immutable');
var templates = require('../templates/index');
var i18n = require('../templates/i18n')();

var menu_hint = [
	{ href: '/', icon: 'squares', text: i18n.t('menu.nav.toggle'), type: ['navigation'] }
];
var menu_nav = [
	{ href: '/', icon: 'home', text: i18n.t('menu.nav.home'), type: ['navigation'] }
	, { href: '/c/club-home', icon: 'heart', text: i18n.t('menu.nav.club'), type: ['navigation'] }
	, { href: '/c/club-ranking', icon: 'graph_rising', text: i18n.t('menu.nav.ranking'), type: ['navigation'] }
	, { href: '/help', icon: 'compass', text: i18n.t('menu.nav.help'), type: ['navigation'] }
];
var menu_user = [
	{ href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), type: ['navigation'] }
	, { href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), type: ['navigation'] }
];

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
	data.menu_hint = menu_hint.map(function(button) {
		if (data.current_path === button.href) {
			button.type.push('active');
		}
		button.version = data.version.asset;
		button.base_url = data.base_url;
		return button;
	});
	data.menu_hint = data.menu_hint.map(templates.common.button);

	// menu partials
	data.menu_nav = menu_nav.map(function(button) {
		if (data.current_path === button.href) {
			button.type.push('active');
		}
		button.version = data.version.asset;
		button.base_url = data.base_url;
		return button;
	});
	data.menu_nav = data.menu_nav.map(templates.common.button);

	// menu partials
	if (!data.current_user) {
		data.menu_user = menu_user.map(function(button) {
			button.version = data.version.asset;
			button.base_url = data.base_url;
			return button;
		});
		data.menu_user = data.menu_user.map(templates.common.button);
	} else {
		data.menu_user = [ templates.common.simpleUser(data) ];
	}

	data.menu = templates.common.menu(data);

	if (data.client) {
		return templates.body(data);
	}

	data.head = templates.head(data);
	data.body = templates.body(data);

	return templates.doc(data);
};
