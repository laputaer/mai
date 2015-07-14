
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
		, className: 'rounded header'
		, text: 'menu.nav.toggle'
		, icon: 'compass'
		, version: data.version.asset
		, base_url: data.base_url
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav')
	});

	var clubOpt = {
		href: '/c/club-home'
		, className: 'rounded header tablet'
		, text: 'menu.nav.club'
		, icon: 'share'
		, version: data.version.asset
		, base_url: data.base_url
	};
	if (data.current_path === clubOpt.href) {
		clubOpt.className += ' active';
	}
	var clubButton = buttonTemplate(clubOpt);

	var rankingOpt = {
		href: '/c/club-ranking'
		, className: 'rounded header tablet'
		, text: 'menu.nav.ranking'
		, icon: 'graph_rising'
		, version: data.version.asset
		, base_url: data.base_url
	};
	if (data.current_path === rankingOpt.href) {
		rankingOpt.className += ' active';
	}
	var rankingButton = buttonTemplate(rankingOpt);

	var helpOpt = {
		href: '/help'
		, className: 'rounded header tablet'
		, text: 'menu.nav.help'
		, icon: 'life_buoy'
		, version: data.version.asset
		, base_url: data.base_url
	};
	if (data.current_path === helpOpt.href) {
		helpOpt.className += ' active';
	}
	var helpButton = buttonTemplate(helpOpt);

	var userButton;
	if (data.current_user) {
		userButton = userButtonTemplate({
			href: '/u/' + data.current_user.uid
			, className: 'rounded header'
			, text: data.current_user.login
			, icon: data.current_user.small_avatar
		});
	} else {
		userButton = buttonTemplate({
			href: '#'
			, className: 'rounded header'
			, text: 'menu.nav.login'
			, icon: 'upload'
			, version: data.version.asset
			, base_url: data.base_url
		});
	}

	var attrs = {
		'data-bgset': data.base_url + '/images/header-320.jpg 320w, '
			+ data.base_url + '/images/header-640.jpg 640w, '
			+ data.base_url + '/images/header-960.jpg 960w, '
			+ data.base_url + '/images/header-1280.jpg 1280w'
		, 'data-sizes': 'auto'
	};

	var header = $('div.page-header.lazyload#header', {
		attributes: attrs
		, key: 'header'
	}, [
		$('div.wrapper', [
			$('h1.title', $('a', { href: '/' }, i18n.t('common.domain')))
			, $('p.tagline', $('a', { href: '/' }, i18n.t('common.tagline')))
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
