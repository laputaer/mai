
/**
 * club-preview.js
 *
 * Template for club preview
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
	// TODO: should we make sure they both exist?
	var club = data.club;
	var embed = club.embed;

	var image;
	if (embed && embed.image) {
		image = $('div.m-image', [
			$('img.lazyload', {
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
		image = $('div.m-image.initials', [
			$('span.m-letter', club.initials)
		]);
	}

	var title;
	if (club.title) {
		title = $('h2.m-title', [
			$('a.m-link', {
				href: '/c/' + club.slug
			}, [
				$('span.m-text', club.title)
			])
		]);
	}

	var stat;
	if (club.points) {
		stat = $('p.m-stat', [
			$('span', i18n.t('club.total-point'))
			, $('span.m-stat-value', club.points.toString())
		]);
	}

	var item = $('div.m-club-preview', [
		image
		, $('div.m-meta', [
			title
			, stat
		])
	]);

	return item;
};