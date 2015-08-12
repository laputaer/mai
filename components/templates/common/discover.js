
/**
 * discover.js
 *
 * Template for discover menu
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
	var version = data.version.asset;
	var ui = data.ui;

	// buttons
	var titleOpts = {
		href: '#'
		, className: 'plain title exit'
		, text: 'menu.nav.discover'
		, icon: 'compass'
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

	var homeOpts = {
		href: '/'
		, className: 'plain discover home'
		, text: 'menu.nav.home'
		, icon: 'home'
		, version: version
	};
	var homeButton = navButtonTemplate(homeOpts);

	var clubOpts = {
		href: '/my-clubs'
		, className: 'plain discover club'
		, text: 'menu.nav.club'
		, icon: 'share'
		, version: version
	};
	var clubButton = navButtonTemplate(clubOpts);

	var profileOpts;
	if (current_user) {
		profileOpts = {
			href: '/u/' + current_user.uid
			, className: 'plain discover login'
			, value: current_user.login
			, image: current_user.avatar
			, size: 'sq-tiny'
		}
	} else {
		profileOpts = {
			href: '#'
			, className: 'plain discover login'
			, text: 'menu.nav.login'
			, icon: 'upload'
			, version: version
			, eventName: 'page:menu:login'
		};
	}

	var profileButton = navButtonTemplate(profileOpts);

	var rankingOpts = {
		href: '/ranking'
		, className: 'plain discover ranking'
		, text: 'menu.nav.ranking'
		, icon: 'graph_rising'
		, version: version
	};
	var rankingButton = navButtonTemplate(rankingOpts);

	var helpOpts = {
		href: '/help'
		, className: 'plain discover help'
		, text: 'menu.nav.help'
		, icon: 'life_buoy'
		, version: version
	};
	var helpButton = navButtonTemplate(helpOpts);

	// menu
	var menuOpts = {
		key: 'discover'
		, id: 'discover'
		, className: 'page-menu'
	};

	if (ui.modal === 'nav') {
		menuOpts.className += ' active';
	}

	var menu = $('div', menuOpts, $('div.wrapper', [
		titleButton
		, closeButton
		, $('ul.navigation', [
			$('li.item', homeButton)
			, $('li.item', clubButton)
			, $('li.item', profileButton)
			, $('li.item', rankingButton)
			, $('li.item', helpButton)
		])
	]));

	return menu;
};
