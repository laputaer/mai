
/**
 * footer.js
 *
 * Template for default footer
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

var navButtonTemplate = require('./navigation-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	// common data
	var version = data.version.asset;
	var base_url = data.base_url;

	var tagline = $('p.tagline', i18n.t('common.tagline-alt'));

	var loginButton = navButtonTemplate({
		href: '#'
		, className: 'rounded nav signup'
		, text: 'menu.nav.login-alt'
		, icon: 'flag'
		, version: version
		, base_url: base_url
		, eventName: 'page:login:open'
	});

	// links
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

	// footer
	var footerOpts = {
		id: 'footer'
		, key: 'footer'
		, className: 'page-footer lazyload'
		, attributes: {
			'data-bgset': base_url + '/images/footer-320.jpg?' + version + ' 320w, '
				+ base_url + '/images/footer-640.jpg?' + version + ' 640w, '
				+ base_url + '/images/footer-960.jpg?' + version + ' 960w, '
				+ base_url + '/images/footer-1280.jpg?' + version + ' 1280w'
			, 'data-sizes': 'auto'
		}
	}

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
