
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
	var post = data.post;

	if (!post) {
		return;
	}

	var og = post.og;
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

	var title;
	if (post.title) {
		title = h('p.m-title', post.title);
	}

	var summary;
	if (post.summary) {
		summary = h('p.m-summary', post.summary);
	}

	var item = h('div.m-post', [
		title
		, summary
		, h('div.m-images', images)
		, h('p.m-meta', [
			h('a.m-link', {
				href: og.url
				, target: '_blank'
			}, [
				h('span', og.title)
			])
			, h('span', ' via ')
			, h('a.m-link', {
				href: og.site_url
				, target: '_blank'
			}, [
				h('span', og.site_name)
			])
		])
	]);

	return item;
};