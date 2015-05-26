
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
	var xss = data.xss;
	var embed = data.embed;

	if (!embed) {
		return;
	}

	var images;
	if (embed.image) {
		images = embed.image.map(function(url) {
			return h('img.m-image.lazyload', {
				src: url + '&size=100'
				, alt: xss.attr(embed.title) + i18n.t('placeholder.image-preview')
				, attributes: {
					'data-src': url + '&size=400'
				}
			});
		});
	}

	var preview = h('div.m-post.preview', [
		h('p.m-title', i18n.t('club.post-title'))
		, h('p.m-summary', i18n.t('club.post-summary'))
		, h('div.m-images', images)
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

	return preview;
};