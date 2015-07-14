
/**
 * footer.js
 *
 * Template for default footer
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var buttonTemplate = require('./button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var loginButton = buttonTemplate({
		href: '#'
		, className: 'rounded footer'
		, text: 'menu.nav.login-alt'
		, icon: 'dialogue_happy'
		, version: data.version.asset
		, base_url: data.base_url
	});

	var footer = $('div.page-footer', $('div.wrapper', [
		$('p.tagline', i18n.t('common.tagline-alt'))
		, loginButton
		, $('ul.navigation', [
			$('li.item', $('a', {
				href: 'https://github.com/maihq'
				, target: '_blank'
			}, i18n.t('menu.footer.copyright')))
			, $('li.item', $('a', {
				href: '/contact'
			}, i18n.t('menu.footer.contact')))
			, $('li.item', $('a', {
				href: '/privacy'
			}, i18n.t('menu.footer.privacy')))
			, $('li.item', $('a', {
				href: '/terms'
			}, i18n.t('menu.footer.terms')))
		])
	]));

	return footer;
};
