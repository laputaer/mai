
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
	var homeOpts = {
		href: '/'
		, className: 'discover home'
		, text: 'menu.nav.home'
		, icon: 'squares'
		, version: data.version.asset
	};
	var homeButton = navButtonTemplate(homeOpts);

	var clubOpts = {
		href: '/c/club-home'
		, className: 'discover club'
		, text: 'menu.nav.club'
		, icon: 'share'
		, version: data.version.asset
	};
	var clubButton = navButtonTemplate(clubOpts);

	var profileOpts = {
		href: '#'
		, className: 'discover login'
		, text: 'menu.nav.login'
		, icon: 'upload'
		, version: data.version.asset
	};
	var profileButton = navButtonTemplate(profileOpts);

	var rankingOpts = {
		href: '/c/club-ranking'
		, className: 'discover ranking'
		, text: 'menu.nav.ranking'
		, icon: 'graph_rising'
		, version: data.version.asset
	};
	var rankingButton = navButtonTemplate(rankingOpts);

	var helpOpts = {
		href: '/help'
		, className: 'discover help'
		, text: 'menu.nav.help'
		, icon: 'life_buoy'
		, version: data.version.asset
	};
	var helpButton = navButtonTemplate(helpOpts);

	var titleOpts = {
		href: '#'
		, className: 'secondary title'
		, text: 'menu.nav.discover'
		, icon: 'compass'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav:close')
	};
	var titleButton = buttonTemplate(titleOpts);

	var closeOpts = {
		href: '#'
		, className: 'secondary close'
		, icon: 'delete'
		, version: data.version.asset
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:nav:close')
	};
	var closeButton = buttonTemplate(closeOpts);

	var discoverOpts = {
		key: 'discover'
		, id: 'discover'
		, className: 'page-discover'
	};

	if (data.ui.nav) {
		discoverOpts.className += ' active';
	}

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
