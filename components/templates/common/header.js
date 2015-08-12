
/**
 * header.js
 *
 * Template for default header
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
	var current_path = data.current_path;
	var version = data.version.asset;
	var base_url = data.base_url;
	var client = data.client;

	var current_user = data.current_user;
	var club_profile = data.club_profile;
	var user_profile = data.user_profile;
	var ui = data.ui;

	// navigation buttons
	var discoverButton = navButtonTemplate({
		href: '#'
		, className: 'rounded nav mobile'
		, text: 'menu.nav.discover'
		, icon: 'compass'
		, version: version
		, eventName: 'page:menu:nav'
		, client: client
	});

	var homeOpts = {
		href: '/'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.home'
		, icon: 'home'
		, version: version
	};
	if (current_path === homeOpts.href) {
		homeOpts.className += ' active';
	}
	var homeButton = navButtonTemplate(homeOpts);

	var clubOpts = {
		href: '/my-clubs'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.club'
		, icon: 'share'
		, version: version
	};
	if (current_path === clubOpts.href) {
		clubOpts.className += ' active';
	}
	var clubButton = navButtonTemplate(clubOpts);

	var rankingOpts = {
		href: '/ranking'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.ranking'
		, icon: 'graph_rising'
		, version: version
	};
	if (current_path === rankingOpts.href) {
		rankingOpts.className += ' active';
	}
	var rankingButton = navButtonTemplate(rankingOpts);

	var helpOpts = {
		href: '/help'
		, className: 'rounded nav tablet'
		, text: 'menu.nav.help'
		, icon: 'life_buoy'
		, version: version
	};
	if (current_path === helpOpts.href) {
		helpOpts.className += ' active';
	}
	var helpButton = navButtonTemplate(helpOpts);

	var userButton;
	if (!current_user) {
		userButton = navButtonTemplate({
			href: '#'
			, className: 'rounded nav'
			, text: 'menu.nav.login'
			, icon: 'upload'
			, version: version
			, eventName: 'page:menu:login'
		});
	} else if (club_profile && club_profile.current_user_member) {
		userButton = navButtonTemplate({
			href: '#'
			, className: 'rounded nav'
			, text: 'menu.nav.options'
			, icon: 'setting_2'
			, version: version
			, eventName: 'page:menu:options'
		});
	} else if (club_profile && !club_profile.current_user_member) {
		userButton = navButtonTemplate({
			href: '#'
			, className: 'rounded nav'
			, text: 'menu.nav.join'
			, icon: 'plus'
			, version: version
			, eventName: 'page:club:join'
			, eventData: { slug: club_profile.slug }
		});
	} else {
		userButton = navButtonTemplate({
			href: '/u/' + current_user.uid
			, className: 'rounded nav'
			, value: current_user.login
			, image: current_user.avatar
			, size: 'sq-tiny'
		});
	}

	// default hero image
	var imageOpts = {
		attributes: {
			role: 'presentation'
			, 'data-srcset': base_url + '/images/header-320.jpg?' + version + ' 320w, '
				+ base_url + '/images/header-640.jpg?' + version + ' 640w, '
				+ base_url + '/images/header-960.jpg?' + version + ' 960w, '
				+ base_url + '/images/header-1280.jpg?' + version + ' 1280w'
			, 'data-sizes': 'auto'
		}
		, src: base_url + '/images/header-320.jpg?' + version
		, alt: ''
		, className: 'lazyload'
	};

	// page specific content
	// TODO: refactor this part
	var avatarOpts, avatarImage, title, tagline;

	// club
	if (club_profile) {
		if (club_profile.image) {
			// background cover
			imageOpts = {
				attributes: {
					role: 'presentation'
				}
				, src: club_profile.image + '&size=bc-medium'
				, alt: ''
			};

			// profile avatar
			avatarOpts = {
				attributes: {
					role: 'presentation'
					, 'data-srcset': club_profile.image + '&size=sq-small 80w, '
						+ club_profile.image + '&size=sq-medium 100w, '
						+ club_profile.image + '&size=sq-large 200w'
					, 'data-sizes': 'auto'
				}
				, src: club_profile.image + '&size=sq-small'
				, alt: club_profile.title + i18n.t('message.common.image-preview')
				, className: 'lazyload'
			};

			avatarImage = $('img.profile-image', avatarOpts);
		} else {
			// no avatar found
			avatarImage = $('div.profile-image', $('span.text', club_profile.initials));
		}

		// title
		title = $('h1.profile-title', $('a', {
			href: '/c/' + club_profile.slug
		}, club_profile.title));

		// tagline
		tagline = $('p.profile-stats', $('a', {
			href: '/u/' + club_profile.owner
		}, i18n.t('profile.club.owner') + ' ' + club_profile.owner_login));

	// user
	} else if (user_profile) {
		if (user_profile.avatar) {
			// background cover
			imageOpts = {
				attributes: {
					role: 'presentation'
				}
				, src: user_profile.avatar + '&size=bc-medium'
				, alt: ''
			};

			// profile avatar
			avatarOpts = {
				attributes: {
					role: 'presentation'
					, 'data-srcset': user_profile.avatar + '&size=sq-small 80w, '
						+ user_profile.avatar + '&size=sq-medium 100w, '
						+ user_profile.avatar + '&size=sq-large 200w'
					, 'data-sizes': 'auto'
				}
				, src: user_profile.avatar + '&size=sq-small'
				, alt: user_profile.name + i18n.t('message.common.image-preview')
				, className: 'lazyload'
			};

			avatarImage = $('img.profile-image', avatarOpts);
		} else {
			// no avatar found
			avatarImage = $('div.profile-image');
		}

		// title
		title = $('h1.profile-title', $('a', {
			href: '/u/' + user_profile.uid
		}, user_profile.name));

		// tagline
		tagline = $('p.profile-stats', navButtonTemplate({
			href: user_profile.origin
			, target: '_blank'
			, className: 'plain source'
			, value: user_profile.provider
			, icon: user_profile.provider
			, version: version
		}));

	// others
	} else {
		// default title and tagline
		title = $('h1.title', $('a', { href: '/' }, i18n.t('common.domain')));
		tagline = $('p.tagline', $('a', { href: '/' }, i18n.t('common.tagline')));
	}

	// background image
	var heroImage = $('img', imageOpts);

	// header
	var headerOpts = {
		id: 'header'
		, key: 'header'
		, className: 'page-header'
	};

	// profile header
	if (club_profile || user_profile) {
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
				, $('li.item', homeButton)
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
