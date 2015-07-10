
/**
 * featured-post.js
 *
 * Template for feature post listing
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
	var postOpt = {
		attributes: {
			'data-id': data.pid
		}
	};
	var wrapperOpt = {};
	var image, link, title;

	if (data.num === 0) {
		wrapperOpt.className = 'section-inset';
	}

	if (data.image) {
		image = $('div.thumbnail.lazyload', {
			//src: data.image + '&size=100'
			//, alt: data.title + i18n.t('placeholder.image-preview')
			attributes: {
				'data-bgset': data.image + '&size=100 100w, '
					+ data.image + '&size=200 200w, '
					+ data.image + '&size=400 400w'
				, 'data-sizes': 'auto'
			}
		});
	}

	link = $('p.link', $('a', {
		href: data.embed.url
		, target: '_blank'
		, title: data.embed.title
	}, data.domain));

	title = $('p.title', data.title);

	var post = $('div.featured-post', postOpt, $('div.wrapper', wrapperOpt, [
		, $('div.image-column', image)
		, $('div.text-column', [
			link
			, title
		])
	]));

	return post;
};
