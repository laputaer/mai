
/**
 * heading.js
 *
 * Template for default heading
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var buttonTemplate = require('./button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var x1 = data.base_url + '/images/header-320.jpg';
	var x2 = data.base_url + '/images/header-640.jpg';
	var x3 = data.base_url + '/images/header-960.jpg';
	var x4 = data.base_url + '/images/header-1280.jpg';

	var discoverButton = buttonTemplate({
		href: '/'
		, icon: 'compass'
		, text: i18n.t('menu.nav.toggle')
		, type: ['heading']
		, version: data.version.asset
	});

	var clubButton = buttonTemplate({
		href: '/c/club-home'
		, icon: 'share'
		, text: i18n.t('menu.nav.club')
		, type: ['heading', 'tablet']
		, version: data.version.asset
	});

	var rankingButton = buttonTemplate({
		href: '/c/club-ranking'
		, icon: 'graph_rising'
		, text: i18n.t('menu.nav.ranking')
		, type: ['heading', 'tablet']
		, version: data.version.asset
	});

	var helpButton = buttonTemplate({
		href: '/help'
		, icon: 'life_buoy'
		, text: i18n.t('menu.nav.help')
		, type: ['heading', 'tablet']
		, version: data.version.asset
	});

	var loginButton = buttonTemplate({
		href: '/'
		, icon: 'upload'
		, text: i18n.t('menu.nav.login')
		, type: ['heading']
		, version: data.version.asset
	});

	var heading = $('div.page-heading.lazyload', {
		attributes: {
			'data-bgset': x1 + ' 320w, '
				+ x2 + ' 640w, '
				+ x3 + ' 960w, '
				+ x4 + ' 1280w'
			, 'data-sizes': 'auto'
		}
	}, [
		$('div.wrapper', [
			$('h1.title', i18n.t('common.domain'))
			, $('p.tagline', i18n.t('common.tagline'))
			, $('ul.navigation', [
				$('li.item', discoverButton)
				, $('li.item', clubButton)
				, $('li.item', rankingButton)
				, $('li.item', helpButton)
			])
			, $('ul.login', [
				$('li.item', loginButton)
			])
		])
	]);

	return heading;
};