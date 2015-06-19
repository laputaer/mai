
/**
 * preview.js
 *
 * Template for post content in general
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var embed = data.embed;

	var type;
	if (data.title && data.summary) {
		type = '.large';
	} else if (!data.title && !data.summary) {
		type = '.small';
	} else {
		type = '';
	}

	var image;
	if (embed.image) {
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
	}

	var title;
	if (data.title) {
		title = $('h2.m-title', data.title);
	}

	var summary;
	if (data.summary) {
		summary = $('p.m-quote', {
			'ev-click': emitter.fire('test-event', data.pid)
		}, data.summary);
	}

	var external;
	if (embed.url) {
		external = $('p.m-external', [
			$('a.m-link.external', {
				href: embed.url
				, target: '_blank'
				, title: embed.title
			}, [
				$('span.m-text', embed.domain)
			])
		]);
	}

	var author;
	if (data.user) {
		author = $('p.m-author', [
			$('a.m-link', {
				href: '/u/' + data.user
			}, [
				$('span.m-text', data.user_name)
			])
			, $('span', i18n.t('club.posted-on'))
			, $('a.m-link', {
				href: '/c/' + data.club
			}, [
				$('span.m-text', data.club_name)
			])
		]);
	}

	var item = $('div.m-preview' + type, [
		image
		, $('div.m-meta', [
			external
			, title
			, summary
			, author
		])
	]);

	return item;
};