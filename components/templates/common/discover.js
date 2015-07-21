
/**
 * discover.js
 *
 * Template for discover menu
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
	var discoverOpts = {
		key: 'discover'
		, id: 'discover'
		, className: 'page-menu'
	};

	if (data.ui.modal === 'nav') {
		discoverOpts.className += ' active';
	}

	var titleOpts = {
		href: '#'
		, className: 'plain title'
		, text: 'menu.nav.discover'
		, icon: 'compass'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav:close')
	};
	var titleButton = buttonTemplate(titleOpts);

	var closeOpts = {
		href: '#'
		, className: 'plain close'
		, icon: 'delete'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav:close')
	};
	var closeButton = buttonTemplate(closeOpts);

	var homeOpts = {
		href: '/'
		, className: 'plain discover home'
		, text: 'menu.nav.home'
		, icon: 'squares'
		, version: data.version.asset
	};
	var homeButton = navButtonTemplate(homeOpts);

	var clubOpts = {
		href: '/c/club-home'
		, className: 'plain discover club'
		, text: 'menu.nav.club'
		, icon: 'share'
		, version: data.version.asset
	};
	var clubButton = navButtonTemplate(clubOpts);

	var profileOpts = {
		href: '#'
		, className: 'plain discover login'
		, text: 'menu.nav.login'
		, icon: 'upload'
		, version: data.version.asset
	};
	var profileButton = navButtonTemplate(profileOpts);

	var rankingOpts = {
		href: '/c/club-ranking'
		, className: 'plain discover ranking'
		, text: 'menu.nav.ranking'
		, icon: 'graph_rising'
		, version: data.version.asset
	};
	var rankingButton = navButtonTemplate(rankingOpts);

	var helpOpts = {
		href: '/help'
		, className: 'plain discover help'
		, text: 'menu.nav.help'
		, icon: 'life_buoy'
		, version: data.version.asset
	};
	var helpButton = navButtonTemplate(helpOpts);

	var discover = $('div', discoverOpts, $('div.wrapper', [
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

	return discover;
};
