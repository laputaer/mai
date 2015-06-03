
/**
 * club-preview.js
 *
 * Template for club preview
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;

	// TODO: should we make sure they both exist?
	var club = data.club;
	var embed = club.embed;

	var image;
	if (embed && embed.image) {
		image = h('div.m-image', [
			h('img.lazyload', {
				src: embed.image.url + '&size=100'
				, alt: embed.title + i18n.t('placeholder.image-preview')
				, attributes: {
					'data-srcset': embed.image.url
						+ '&size=100 100w, '
						+ embed.image.url
						+ '&size=200 200w, '
						+ embed.image.url
						+ '&size=400 400w'
					, 'data-sizes': 'auto'
				}
			})
		]);
	} else {
		image = h('div.m-image.initials', [
			h('span.m-letter', club.initials)
		]);
	}

	var title;
	if (club.title) {
		title = h('h2.m-title', [
			h('a.m-link', {
				href: '/c/' + club.slug
			}, [
				h('span.m-text', club.title)
			])
		]);
	}

	var stat;
	if (club.points) {
		stat = h('p.m-stat', [
			h('span', i18n.t('club.total-point'))
			, h('span.m-stat-value', club.points.toString())
		]);
	}

	var item = h('div.m-club-preview', [
		image
		, h('div.m-meta', [
			title
			, stat
		])
	]);

	return item;
};