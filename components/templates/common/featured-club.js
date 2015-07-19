
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
	var clubOpt = {
		id: data.slug
		, key: data.slug
		, className: 'featured-club'
	};

	var imageOpts = {
		src: data.image + '&size=ls-small'
		, alt: data.title + i18n.t('placeholder.image-preview')
		, attributes: {
			'data-srcset': data.image + '&size=ls-small 320w, '
				+ data.image + '&size=ls-medium 640w, '
				+ data.image + '&size=ls-large 960w'
			, 'data-sizes': 'auto'
		}
	};

	var clubImage = $('img.lazyload', imageOpts);

	var wrapperOpts = {
		className: 'wrapper'
	}

	if (data.num === 0) {
		wrapperOpts.className += ' section-inset';
	}

	var titleLink = $('a', {
		href: '/c/' + data.slug
		, title: data.intro
	}, data.title);

	var club = $('div', clubOpt, [
		$('div.image', clubImage)
		, $('div', wrapperOpts, [
			$('h1.title', titleLink)
		])
	]);

	return club;
};
