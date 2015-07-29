
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
	var clubOpts = {
		id: 'club-' + data.slug
		, key: 'club-' + data.slug
		, className: 'featured-club'
	};

	var imageOpts, clubImage;

	if (data.image) {
		imageOpts = {
			attributes: {
				'data-srcset': data.image + '&size=ls-small 320w, '
					+ data.image + '&size=ls-medium 640w'
				, 'data-sizes': 'auto'
			}
			, src: data.image + '&size=ls-small'
			, alt: data.title + i18n.t('placeholder.image-preview')
			, className: 'lazyload'
		};

		clubImage = $('img', imageOpts);
	}

	var wrapperOpts = {
		className: 'wrapper'
	}

	var linkOpts = {
		href: '/c/' + data.slug
		, title: data.intro
	};

	var clubTitle = $('span.title', data.title);

	var club = $('div', clubOpts, [
		$('div.image', clubImage)
		, $('div', wrapperOpts, $('a.link', linkOpts, clubTitle))
	]);

	return club;
};
