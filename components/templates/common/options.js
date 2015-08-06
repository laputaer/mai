
/**
 * options.js
 *
 * Template for options menu
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
	var current_user = data.current_user;
	var club_profile = data.club_profile;
	var version = data.version.asset;
	var image_base_url = data.image_base_url;
	var current_url = data.current_url;
	var ui = data.ui;

	// buttons
	var titleOpts = {
		href: '#'
		, className: 'plain title'
		, text: 'menu.nav.options'
		, icon: 'setting_2'
		, version: version
		, eventName: 'page:menu:close'
	};
	var titleButton = navButtonTemplate(titleOpts);

	var closeOpts = {
		href: '#'
		, className: 'plain close'
		, icon: 'delete'
		, version: version
		, eventName: 'page:menu:close'
	};
	var closeButton = navButtonTemplate(closeOpts);

	var twitterUrl = 'https://twitter.com/intent/tweet'
		+ '?url='
		+ encodeURIComponent(current_url)
		+ '&text='
		+ i18n.t('profile.club.share-message', club_profile);
		+ '&related=rubume'

	var twitterOpts = {
		href: twitterUrl
		, className: 'plain login twitter'
		, text: 'menu.options.twitter'
		, icon: 'twitter'
		, version: version
		, target: '_blank'
	};
	var twitterButton = navButtonTemplate(twitterOpts);

	var weiboUrl = 'http://service.weibo.com/share/share.php'
		+ '?url='
		+ encodeURIComponent(current_url)
		+ '&title='
		+ i18n.t('profile.club.share-message', club_profile)
		+ '&searchPic=true'
		+ '&appkey=865867638';

	if (club_profile.image) {
		weiboUrl += '&pic=' + encodeURIComponent(club_profile.image + '&size=ls-medium');
	}

	var weiboOpts = {
		href: weiboUrl
		, className: 'plain login weibo'
		, text: 'menu.options.weibo'
		, image: image_base_url + '/images/weibo-logo-64.png'
		, version: version
		, target: '_blank'
	};
	var weiboButton = navButtonTemplate(weiboOpts);

	var manageButton, eventData;
	if (current_user && current_user.uid === club_profile.owner) {
		eventData = {
			order: 2
			, view: 'club-posts-section'
			, menu: true
		};

		var manageOpts = {
			href: '#'
			, className: 'plain options manage'
			, text: 'menu.options.manage'
			, icon: 'sinth'
			, version: version
			, eventName: 'page:tab:change'
			, eventData: eventData
		};

		manageButton = navButtonTemplate(manageOpts);
	}

	var statButton;
	/*
	eventData = {
		order: 3
		, view: 'club-posts-section'
		, menu: true
	};
	var statOpts = {
		href: '#'
		, className: 'plain options stats'
		, text: 'menu.options.stats'
		, icon: 'graph'
		, version: version
		, eventName: 'page:tab:change'
		, eventData: eventData
	};
	var statButton = navButtonTemplate(statOpts);
	*/

	var leaveButton;
	if (current_user && club_profile.current_user_member && current_user.uid !== club_profile.owner) {
		var leaveOpts = {
			href: '#'
			, className: 'plain options leave'
			, text: 'menu.options.leave'
			, icon: 'minus'
			, version: version
			, eventName: 'page:club:leave'
			, eventData: { slug: club_profile.slug }
		};

		leaveButton = navButtonTemplate(leaveOpts);
	}

	// list
	var buttons = [twitterButton, weiboButton, manageButton, statButton, leaveButton];

	buttons = buttons.filter(function (button) {
		return !!button;
	}).map(function (button) {
		return $('li.item', button);
	});

	// menu
	var menuOpts = {
		key: 'options'
		, id: 'options'
		, className: 'page-menu'
	};

	if (ui.modal === 'options') {
		menuOpts.className += ' active';
	}

	var menu = $('div', menuOpts, $('div.wrapper', [
		titleButton
		, closeButton
		, $('ul.navigation', buttons)
	]));

	return menu;
};
