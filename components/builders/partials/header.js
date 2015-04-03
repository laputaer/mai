
/**
 * header.js
 *
 * Render page header into partials vnode
 */

var headingTemplate = require('../../templates/common/heading');
var menuTemplate = require('../../templates/common/menu');
var itemTemplate = require('../../templates/common/menu-item');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function renderer(data) {
	var i18n = data.i18n;
	var nav = [
		{ href: '/', icon: 'squares', text: i18n.t('menu.nav.toggle'), version: data.version.asset }
		, { href: '/', icon: 'home', text: i18n.t('menu.nav.home'), version: data.version.asset }
		, { href: '/home', icon: 'heart', text: i18n.t('menu.nav.my'), version: data.version.asset }
		, { href: '/ranking', icon: 'graph_rising', text: i18n.t('menu.nav.ranking'), version: data.version.asset }
		, { href: '/help', icon: 'compass', text: i18n.t('menu.nav.help'), version: data.version.asset }
	];
	nav = nav.map(itemTemplate);
	var login = [
		{ href: '/connect/twitter', icon: 'twitter', text: i18n.t('menu.login.twitter'), version: data.version.asset }
		, { href: '/connect/github', icon: 'github', text: i18n.t('menu.login.github'), version: data.version.asset }
	];
	login = login.map(itemTemplate);

	var partials = {};
	partials.heading = headingTemplate({ i18n: data.i18n });
	partials.menu = menuTemplate({ nav: nav, login: login });

	return partials;
};
