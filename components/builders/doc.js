
/**
 * doc.js
 *
 * Render document
 */

// immutable object
var I = require('icepick');

var immutable = require('./immutable');
var cache = require('./cache');

var templates = require('../templates/index');
var i18n = require('../templates/i18n')();

// provide basic button data, freeze them for performance
var menu_hint = I.freeze([
	{ href: '/', icon: 'squares', text: i18n.t('menu.nav.toggle'), type: ['navigation'] }
]);
var menu_nav = I.freeze([
	{ href: '/', icon: 'home', text: i18n.t('menu.nav.home'), type: ['navigation'] }
	, { href: '/c/club-home', icon: 'heart', text: i18n.t('menu.nav.club'), type: ['navigation'] }
	, { href: '/c/club-ranking', icon: 'graph_rising', text: i18n.t('menu.nav.ranking'), type: ['navigation'] }
	, { href: '/help', icon: 'compass', text: i18n.t('menu.nav.help'), type: ['navigation'] }
]);
var menu_user = I.freeze([
	{ href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), type: ['navigation'] }
	, { href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), type: ['navigation'] }
]);

// cache the result
var cached_menu_hint, cached_menu_nav, cached_menu_user;

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

	// menu data
	// TODO: reuse these code
	if (!cached_menu_hint) {
		cached_menu_hint = I.map(function (button) {
			return I.assign(button, {
				client: !!data.client
				, version: data.version.asset
				, base_url: data.base_url
			});
		}, menu_hint);
	}

	if (!cached_menu_nav) {
		cached_menu_nav = I.map(function(button) {
			return I.assign(button, {
				client: !!data.client
				, version: data.version.asset
				, base_url: data.base_url
			});
		}, menu_nav);
	}

	if (!cached_menu_user) {
		cached_menu_user = I.map(function(button) {
			return I.assign(button, {
				client: !!data.client
				, version: data.version.asset
				, base_url: data.base_url
			});
		}, menu_user);
	}

	// menu items
	// TODO: reuse these code
	data.menu_hint = cached_menu_hint.map(function(button) {
		if (data.current_path !== button.href) {
			return immutable(templates.common.button, button);
		}

		var b = I.assign(button, {
			type: I.push(button.type, 'active')
		});
		return immutable(templates.common.button, b);
	});
	data.menu_nav = cached_menu_nav.map(function(button) {
		if (data.current_path !== button.href) {
			return immutable(templates.common.button, button);
		}

		var b = I.assign(button, {
			type: I.push(button.type, 'active')
		});
		return immutable(templates.common.button, b);
	});

	if (!data.current_user) {
		data.menu_user = cached_menu_user.map(function(button) {
			return immutable(templates.common.button, button);
		});
	} else {
		data.menu_user = [ templates.common.simpleUser(data) ];
	}

	//data.menu = templates.common.menu(data);
	data.page = templates.main(data);
	data.head = templates.head(data);
	data.body = templates.body(data);

	if (data.client) {
		return data.page;
	}

	return templates.doc(data);
};
