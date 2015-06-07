
/**
 * preview.js
 *
 * Template for post content in general
 */

var $ = require('../vdom');

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
	var post = data.post;
	var embed = post.embed;

	var type;
	if (post.title && post.summary) {
		type = '.large';
	} else if (!post.title && !post.summary) {
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
	if (post.title) {
		title = $('h2.m-title', post.title);
	}

	var summary;
	if (post.summary) {
		summary = $('p.m-quote', post.summary);
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
	if (post.user) {
		author = $('p.m-author', [
			$('a.m-link', {
				href: '/u/' + post.user
			}, [
				$('span.m-text', post.user_name)
			])
			, $('span', i18n.t('club.posted-on'))
			, $('a.m-link', {
				href: '/c/' + post.club
			}, [
				$('span.m-text', post.club_name)
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