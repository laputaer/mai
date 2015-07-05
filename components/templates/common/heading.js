
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
		, type: ['heading', 'page-heading-navigation']
	});

	var loginButton = buttonTemplate({
		href: '/'
		, icon: 'upload'
		, text: i18n.t('menu.nav.login')
		, type: ['heading', 'page-heading-login']
	});

	var heading = $('div.page-heading.lazyload', {
		attributes: {
			'data-bgset': x1 + ' 320w, '
				+ x2 + ' 640w, '
				+ x3 + ' 960w, '
				+ x4 + ' 1280w'
			, 'data-sizes': 'auto'
		}
		, style: {
			'background-image': 'url(' + x1 + ')'
		}
	}, [
		$('div.wrapper', [
			$('h1.title', i18n.t('common.domain'))
			, $('p.tagline', i18n.t('common.tagline'))
			, $('ul.navigation', [
				$('li.item', discoverButton)
			])
			, $('ul.login', [
				$('li.item', loginButton)
			])
		])
	]);

	return heading;
};