
/**
 * header.js
 *
 * Template for default header
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

var buttonTemplate = require('./button');
var userButtonTemplate = require('./user-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var discoverButton = buttonTemplate({
		href: '#'
		, className: 'rounded nav'
		, text: 'menu.nav.discover'
		, icon: 'compass'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav:open')
	});

	var clubOpts = {
		href: '/my-clubs'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.club'
		, icon: 'share'
		, version: data.version.asset
	};
	if (data.current_path === clubOpts.href) {
		clubOpts.className += ' active';
	}
	var clubButton = buttonTemplate(clubOpts);

	var rankingOpts = {
		href: '/ranking'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.ranking'
		, icon: 'graph_rising'
		, version: data.version.asset
	};
	if (data.current_path === rankingOpts.href) {
		rankingOpts.className += ' active';
	}
	var rankingButton = buttonTemplate(rankingOpts);

	var helpOpts = {
		href: '/help'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.help'
		, icon: 'life_buoy'
		, version: data.version.asset
	};
	if (data.current_path === helpOpts.href) {
		helpOpts.className += ' active';
	}
	var helpButton = buttonTemplate(helpOpts);

	var userButton;
	if (data.current_user) {
		userButton = userButtonTemplate({
			href: '/u/' + data.current_user.uid
			, className: 'rounded nav'
			, text: data.current_user.login
			, icon: data.current_user.avatar
		});
	} else {
		userButton = buttonTemplate({
			href: '#'
			, className: 'rounded nav'
			, text: 'menu.nav.login'
			, icon: 'upload'
			, version: data.version.asset
			, eventName: 'ev-click'
			, eventHandler: emitter.capture('page:login:open')
		});
	}

	var headerOpts = {
		id: 'header'
		, key: 'header'
		, className: 'page-header'
	};

	var imageOpts;
	if (data.club_profile && data.club_profile.image) {
		imageOpts = {
			attributes: {
				role: 'presentation'
			}
			, src: data.club_profile.image + '&size=bg-small'
			, alt: ''
		};
	} else {
		imageOpts = {
			attributes: {
				role: 'presentation'
				, 'data-srcset': data.base_url + '/images/header-320.jpg?' + data.version.asset + ' 320w, '
					+ data.base_url + '/images/header-640.jpg?' + data.version.asset + ' 640w, '
					+ data.base_url + '/images/header-960.jpg?' + data.version.asset + ' 960w, '
					+ data.base_url + '/images/header-1280.jpg?' + data.version.asset + ' 1280w'
				, 'data-sizes': 'auto'
			}
			, src: data.base_url + '/images/header-320.jpg?' + data.version.asset
			, alt: ''
			, className: 'lazyload'
		};
	}

	var heroImage = $('img', imageOpts);
	var titleLink = $('a', { href: '/' }, i18n.t('common.domain'));
	var taglineLink = $('a', { href: '/' }, i18n.t('common.tagline'));

	var header = $('div', headerOpts, [
		$('div.image', heroImage)
		, $('div.wrapper', [
			$('h1.title', titleLink)
			, $('p.tagline', taglineLink)
			, $('ul.navigation', [
				$('li.item', discoverButton)
				, $('li.item', clubButton)
				, $('li.item', rankingButton)
				, $('li.item', helpButton)
			])
			, $('ul.login', [
				$('li.item', userButton)
			])
		])
	]);

	return header;
};
