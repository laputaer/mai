
/**
 * options.js
 *
 * Template for options menu
 */

var $ = require('../vdom');
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

	var twitterOpts = {
		href: '#'
		, className: 'plain login twitter'
		, text: 'menu.options.twitter'
		, icon: 'twitter'
		, version: version
	};
	var twitterButton = navButtonTemplate(twitterOpts);

	var weiboOpts = {
		href: '#'
		, className: 'plain login weibo'
		, text: 'menu.options.weibo'
		, image: image_base_url + '/images/weibo-logo-64.png'
		, version: version
	};
	var weiboButton = navButtonTemplate(weiboOpts);

	var manageButton;
	if (current_user && club_profile && current_user.uid === club_profile.owner) {
		var manageOpts = {
			href: '#'
			, className: 'plain options manage'
			, text: 'menu.options.manage'
			, icon: 'sinth'
			, version: version
		};

		manageButton = navButtonTemplate(manageOpts);
	}

	var statOpts = {
		href: '#'
		, className: 'plain options stats'
		, text: 'menu.options.stats'
		, icon: 'graph'
		, version: version
	};
	var statButton = navButtonTemplate(statOpts);

	var leaveButton;
	if (current_user && club_profile && club_profile.current_user_member && current_user.uid !== club_profile.owner) {
		var leaveOpts = {
			href: '#'
			, className: 'plain options leave'
			, text: 'menu.options.leave'
			, icon: 'minus'
			, version: version
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
