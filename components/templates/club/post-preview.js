
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
	var og = data.og;

	if (!og) {
		return;
	}

	var images;
	if (og.image) {
		images = og.image.map(function(url) {
			return h('div.m-image', {
				style: {
					'background-image': 'url(' + url + ')'
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
				href: og.url
			}, [
				h('span', og.title)
			])
			, h('span', ' via ')
			, h('a.m-link', {
				href: og.site_url
			}, [
				h('span', og.site_name)
			])
		])
	]);

	return preview;
};