
/**
 * heading.js
 *
 * Template for default heading
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

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
		$('h1.page-heading-title.main', i18n.t('common.domain'))
		, $('p.page-heading-title.tagline', i18n.t('common.tagline'))
	]);

	return heading;
};