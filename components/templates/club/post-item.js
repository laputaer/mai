
/**
 * post-item.js
 *
 * Template for post content in club profile
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

	var images;
	if (embed && embed.image) {
		images = embed.image.map(function(url, index) {
			return h('img.lazyload', {
				src: url + '&size=100'
				, alt: embed.title + i18n.t('placeholder.image-preview')
					+ ' 0' + index.toString()
				, attributes: {
					'data-srcset': url
						+ '&size=100 100w, '
						+ url
						+ '&size=200 200w, '
						+ url
						+ '&size=400 400w'
					, 'data-sizes': 'auto' 
				}
			});
		});

		images = h('div.m-images', images);
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
			, h('span', embed.title)
		]);
	}

	var author;
	if (post.user) {
		author = h('p.m-author', [
			h('span', i18n.t('club.posted-by'))
			, h('a.m-link', {
				href: '/u/' + post.user
			}, [
				h('span.m-text', post.user_name)
			])
		]);
	}

	var item = h('div.m-post', [
		images
		, h('div.m-meta', [
			external
			, title
			, summary
			, author
		])
	]);

	return item;
};