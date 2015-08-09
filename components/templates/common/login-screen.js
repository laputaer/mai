
/**
 * login-screen.js
 *
 * Template for login menu
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
	var version = data.version.asset;
	var base_url = data.base_url;
	var ui = data.ui;

	// buttons
	var titleOpts = {
		href: '#'
		, className: 'plain title'
		, text: 'menu.nav.login'
		, icon: 'compass'
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
		href: '/connect/twitter'
		, className: 'plain login twitter'
		, text: 'menu.login.twitter'
		, icon: 'twitter'
		, version: version
	};
	var twitterButton = navButtonTemplate(twitterOpts);

	var githubOpts = {
		href: '/connect/github'
		, className: 'plain login github'
		, text: 'menu.login.github'
		, icon: 'github'
		, version: version
	};
	var githubButton = navButtonTemplate(githubOpts);

	var weiboOpts = {
		href: '/connect/weibo'
		, className: 'plain login weibo'
		, text: 'menu.login.weibo'
		, image: base_url + '/images/weibo-logo-64.png'
		, version: version
	};
	var weiboButton = navButtonTemplate(weiboOpts);

	// menu
	var menuOpts = {
		id: 'login-screen'
		, key: 'login-screen'
		, className: 'page-menu'
	};

	if (ui.modal === 'login') {
		menuOpts.className += ' active';
	}

	var menu = $('div', menuOpts, $('div.wrapper', [
		titleButton
		, closeButton
		, $('ul.navigation', [
			$('li.item', twitterButton)
			, $('li.item', githubButton)
			, $('li.item', weiboButton)
		])
	]));

	return menu;
};
