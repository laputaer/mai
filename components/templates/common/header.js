
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
var navButtonTemplate = require('./navigation-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	// navigation buttons
	var discoverButton = navButtonTemplate({
		href: '#'
		, className: 'rounded nav'
		, text: 'menu.nav.discover'
		, icon: 'compass'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav:open')
		, client: data.client
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

	// default hero image
	var imageOpts = {
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

	// page specific content
	var avatarOpts, avatarImage, title, tagline;

	if (data.club_profile) {
		if (data.club_profile.image) {
			imageOpts = {
				attributes: {
					role: 'presentation'
				}
				, src: data.club_profile.image + '&size=bc-medium'
				, alt: ''
			};

			avatarOpts = {
				attributes: {
					role: 'presentation'
					, 'data-srcset': data.club_profile.image + '&size=sq-small 80w, '
						+ data.club_profile.image + '&size=sq-medium 100w, '
						+ data.club_profile.image + '&size=sq-large 200w'
					, 'data-sizes': 'auto'
				}
				, src: data.club_profile.image + '&size=sq-small'
				, alt: ''
				, className: 'lazyload'
			};

			avatarImage = $('img.profile-image', avatarOpts);
		} else {
			avatarImage = $('div.profile-image', $('span.text', data.club_profile.initials));
		}

		title = $('h1.profile-title', $('a', {
			href: '/c/' + data.club_profile.slug
		}, data.club_profile.title));

		tagline = $('p.profile-stats', $('a', {
			href: '/u/' + data.club_profile.owner
		}, i18n.t('profile.club.owner') + ' ' + data.club_profile.owner_login));

	} else if (data.user_profile) {
		if (data.user_profile.avatar) {
			imageOpts = {
				attributes: {
					role: 'presentation'
				}
				, src: data.user_profile.avatar + '&size=bc-medium'
				, alt: ''
			};

			avatarOpts = {
				attributes: {
					role: 'presentation'
					, 'data-srcset': data.user_profile.avatar + '&size=sq-small 80w, '
						+ data.user_profile.avatar + '&size=sq-medium 100w, '
						+ data.user_profile.avatar + '&size=sq-large 200w'
					, 'data-sizes': 'auto'
				}
				, src: data.user_profile.avatar + '&size=sq-small'
				, alt: ''
				, className: 'lazyload'
			};

			avatarImage = $('img.profile-image', avatarOpts);
		} else {
			avatarImage = $('div.profile-image');
		}

		title = $('h1.profile-title', $('a', {
			href: '/u/' + data.user_profile.uid
		}, data.user_profile.name));

		tagline = $('p.profile-stats', navButtonTemplate({
			href: data.user_profile.origin
			, target: '_blank'
			, className: 'plain source'
			, value: data.user_profile.provider
			, icon: data.user_profile.provider
			, version: data.version.asset
		}));

	} else {
		title = $('h1.title', $('a', { href: '/' }, i18n.t('common.domain')));
		tagline = $('p.tagline', $('a', { href: '/' }, i18n.t('common.tagline')));
	}

	var heroImage = $('img', imageOpts);

	// header
	var headerOpts = {
		id: 'header'
		, key: 'header'
		, className: 'page-header'
	};

	if (data.club_profile || data.user_profile) {
		headerOpts.className += ' profile';
	}

	var header = $('div', headerOpts, [
		$('div.image', heroImage)
		, $('div.wrapper', [
			avatarImage
			, title
			, tagline
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
