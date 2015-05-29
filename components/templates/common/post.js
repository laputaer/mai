
/**
 * post.js
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
	var xss = data.xss;
	var post = data.post;

	if (!post || !post.embed) {
		return;
	}

	var embed = post.embed;
	var images;
	if (embed.image) {
		images = embed.image.map(function(url) {
			return h('img.m-image.lazyload', {
				src: url + '&size=100'
				, alt: xss.attr(embed.title) + i18n.t('placeholder.image-preview')
				, attributes: {
					'data-srcset': url + '&size=100 100w, ' + url + '&size=200 200w, ' + url + '&size=400 400w'
					, 'data-sizes': 'auto' 
				}
			});
		});

		images = h('div.m-images', images);
	}

	var title;
	if (post.title) {
		title = h('p.m-title', xss.data(post.title));
	}

	var summary;
	if (post.summary) {
		summary = h('p.m-summary', xss.data(post.summary));
	}

	var item = h('div.m-post', [
		title
		, summary
		, images
		, h('p.m-meta', [
			h('a.m-link', {
				href: xss.url(embed.url)
				, target: '_blank'
			}, [
				h('span', xss.data(embed.title))
			])
			, h('span', ' via ')
			, h('a.m-link', {
				href: xss.url(embed.site_url)
				, target: '_blank'
			}, [
				h('span', xss.data(embed.site_name))
			])
		])
	]);

	return item;
};