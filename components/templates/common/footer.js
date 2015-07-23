
/**
 * footer.js
 *
 * Template for default footer
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

var buttonTemplate = require('./button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var footerOpts = {
		id: 'footer'
		, key: 'footer'
		, className: 'page-footer lazyload'
		, attributes: {
			'data-bgset': data.base_url + '/images/footer-320.jpg?' + data.version.asset + ' 320w, '
				+ data.base_url + '/images/footer-640.jpg?' + data.version.asset + ' 640w, '
				+ data.base_url + '/images/footer-960.jpg?' + data.version.asset + ' 960w, '
				+ data.base_url + '/images/footer-1280.jpg?' + data.version.asset + ' 1280w'
			, 'data-sizes': 'auto'
		}
	}

	var tagline = $('p.tagline', i18n.t('common.tagline-alt'));

	var loginButton = buttonTemplate({
		href: '#'
		, className: 'rounded nav'
		, text: 'menu.nav.login-alt'
		, icon: 'dialogue_happy'
		, version: data.version.asset
		, base_url: data.base_url
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:login:open')
	});

	var copyrightLink = $('a', {
		href: 'https://github.com/maihq'
		, target: '_blank'
	}, i18n.t('menu.footer.copyright'));

	var contactLink = $('a', {
		href: '/contact'
	}, i18n.t('menu.footer.contact'));

	var privacyLink = $('a', {
		href: '/privacy'
	}, i18n.t('menu.footer.privacy'));

	var termsLink = $('a', {
		href: '/terms'
	}, i18n.t('menu.footer.terms'));

	var footer = $('div', footerOpts, $('div.wrapper', [
			tagline
			, loginButton
			, $('ul.navigation', [
				$('li.item', copyrightLink)
				, $('li.item', contactLink)
				, $('li.item', privacyLink)
				, $('li.item', termsLink)
			])
	]));

	return footer;
};
