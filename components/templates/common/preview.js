
/**
 * preview.js
 *
 * Template for post content in general
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
	}

	var title;
	if (post.title) {
		title = h('h2.m-title', post.title);
	}

	var summary;
	if (post.summary) {
		summary = h('p.m-quote', post.summary);
	}

	var external;
	if (embed.url) {
		external = h('p.m-external', [
			h('a.m-link.external', {
				href: embed.url
				, target: '_blank'
				, title: embed.title
			}, [
				h('span.m-text', embed.domain)
			])
		]);
	}

	var author;
	if (post.user) {
		author = h('p.m-author', [
			h('a.m-link', {
				href: '/u/' + post.user
			}, [
				h('span.m-text', post.user_name)
			])
			, h('span', i18n.t('club.posted-on'))
			, h('a.m-link', {
				href: '/c/' + post.club
			}, [
				h('span.m-text', post.club_name)
			])
		]);
	}

	var item = h('div.m-preview' + type, [
		image
		, h('div.m-meta', [
			external
			, title
			, summary
			, author
		])
	]);

	return item;
};