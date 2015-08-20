
/**
 * user-options.js
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
	var user_profile = data.user_profile;
	var version = data.version.asset;
	var base_url = data.base_url;
	var current_url = data.current_url;
	var ui = data.ui;

	// buttons
	var titleOpts = {
		href: '#'
		, className: 'plain title exit'
		, text: 'menu.nav.options'
		, icon: 'setting_2'
		, version: version
		, eventName: 'page:menu:close'
	};
	var titleButton = navButtonTemplate(titleOpts);

	var closeOpts = {
		href: '#'
		, className: 'plain close exit'
		, icon: 'delete'
		, version: version
		, eventName: 'page:menu:close'
	};
	var closeButton = navButtonTemplate(closeOpts);

	var twitterUrl = 'https://twitter.com/intent/tweet'
		+ '?url='
		+ encodeURIComponent(current_url)
		+ '&text='
		+ i18n.t('profile.user.share-message');
		+ '&related=rubume'

	var twitterOpts = {
		href: twitterUrl
		, className: 'plain options twitter'
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
		+ i18n.t('profile.user.share-message')
		+ '&searchPic=true'
		+ '&appkey=865867638';

	if (user_profile.avatar) {
		weiboUrl += '&pic=' + encodeURIComponent(user_profile.avatar + '&size=ls-medium');
	}

	var weiboOpts = {
		href: weiboUrl
		, className: 'plain options weibo'
		, text: 'menu.options.weibo'
		, image: base_url + '/images/weibo-logo-64.png'
		, version: version
		, target: '_blank'
	};
	var weiboButton = navButtonTemplate(weiboOpts);

	var manageButton, eventData;
	/*
	if (user_profile.current_user) {
		eventData = {
			order: 2
			, view: 'recent-posts-section'
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
	*/

	var statButton;
	/*
	eventData = {
		order: 3
		, view: 'recent-posts-section'
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
	/*
	if (user_profile.current_user_watch) {
		var leaveOpts = {
			href: '#'
			, className: 'plain options leave'
			, text: 'menu.options.leave'
			, icon: 'minus'
			, version: version
			, eventName: 'page:user:unwatch'
			, eventData: { uid: user_profile.uid }
		};

		leaveButton = navButtonTemplate(leaveOpts);
	}
	*/

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
