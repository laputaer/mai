
/**
 * login-screen.js
 *
 * Template for login menu
 */

var $ = require('../vdom');
var emitter = require('../emitter');

var buttonTemplate = require('./button');
var navButtonTemplate = require('./navigation-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var loginOpts = {
		id: 'login-screen'
		, key: 'login-screen'
		, className: 'page-menu'
	};

	if (data.ui.modal === 'login') {
		loginOpts.className += ' active';
	}

	var titleOpts = {
		href: '#'
		, className: 'plain title'
		, text: 'menu.nav.login'
		, icon: 'compass'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:login:close')
	};
	var titleButton = buttonTemplate(titleOpts);

	var closeOpts = {
		href: '#'
		, className: 'plain close'
		, icon: 'delete'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:login:close')
	};
	var closeButton = buttonTemplate(closeOpts);

	var twitterOpts = {
		href: '/connect/twitter'
		, className: 'plain login twitter'
		, text: 'menu.login.twitter'
		, icon: 'twitter'
		, version: data.version.asset
	};
	var twitterButton = navButtonTemplate(twitterOpts);

	var githubOpts = {
		href: '/connect/github'
		, className: 'plain login github'
		, text: 'menu.login.github'
		, icon: 'github'
		, version: data.version.asset
	};
	var githubButton = navButtonTemplate(githubOpts);

	var weiboOpts = {
		href: '/connect/weibo'
		, className: 'plain login weibo'
		, text: 'menu.login.weibo'
		, image: data.image_base_url + '/images/weibo-logo-64.png'
		, version: data.version.asset
	};
	var weiboButton = navButtonTemplate(weiboOpts);

	var login = $('div', loginOpts, $('div.wrapper', [
		titleButton
		, closeButton
		, $('ul.navigation', [
			$('li.item', twitterButton)
			, $('li.item', githubButton)
			, $('li.item', weiboButton)
		])
	]));

	return login;
};
