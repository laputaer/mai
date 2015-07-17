
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
 * @param   Object  opts  Global data for rendering
 * @return  VNode
 */
function template(data, opts) {
	var clubOpt = {
		id: data.slug
		, key: data.slug
	};

	if (opts.num === 0) {
		clubOpt.className = 'section-inset';
	}

	if (data.image) {
		clubOpt.attributes = {
			'data-bgset': data.image + '&size=ls-small 320w, '
				+ data.image + '&size=ls-medium 640w, '
				+ data.image + '&size=ls-large 960w'
			, 'data-sizes': 'auto'
		};

		clubOpt.style = {
			'background-image': 'url(' + data.image + '&size=ls-small)'
		};
	}

	var club = $('div.featured-club.lazyload', clubOpt, $('div.wrapper', [
		$('h1.title', $('a', {
			href: '/c/' + data.slug
			, title: data.intro
		}, data.title))
	]));

	return club;
};
