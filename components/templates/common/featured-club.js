
/**
 * heading.js
 *
 * Template for feature club listing
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
	var clubOpt = {};

	if (data.num === 0) {
		clubOpt.className = 'section-inset';
	}

	if (data.image) {
		clubOpt.attributes = {
			'data-bgset': data.image + '&size=100 100w, '
				+ data.image + '&size=200 200w, '
				+ data.image + '&size=400 400w'
			, 'data-sizes': 'auto'
		};

		clubOpt.style = {
			'background-image': 'url(' + data.image + '&size=100' + ')'
		};
	}

	var club = $('div.featured-club.lazyload', clubOpt, $('div.wrapper', [
		$('h1.title', $('a', { href: '/c/' + data.slug }, data.title))
	]));

	return club;
};
