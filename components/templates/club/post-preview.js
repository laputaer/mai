
/**
 * post-preview.js
 *
 * Template for post content preview
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

	var embed = data.embed;
	var user = data.current_user;

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

	var title = h('h2.m-title', i18n.t('club.post-title'));

	var summary = h('p.m-quote', i18n.t('club.post-summary'));

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
	if (user) {
		author = h('p.m-author', [
			h('span', i18n.t('club.posted-by'))
			, h('a.m-link', {
				href: '/u/' + user.uid
			}, [
				h('span.m-text', user.name)
			])
		]);
	}

	var item = h('div.m-post.preview', [
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