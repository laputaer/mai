
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
	var xss = data.xss;
	var post = data.post;

	if (!post) {
		return;
	}

	var og = post.og;
	var images;
	if (og.image) {
		images = og.image.map(function(url) {
			return h('img.m-image', {
				src: url
			});
		});
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
		, h('div.m-images', images)
		, h('p.m-meta', [
			h('a.m-link', {
				href: xss.url(og.url)
				, target: '_blank'
			}, [
				h('span', xss.data(og.title))
			])
			, h('span', 'via')
			, h('a.m-link', {
				href: xss.url(og.site_url)
				, target: '_blank'
			}, [
				h('span', xss.data(og.site_name))
			])
		])
	]);

	return item;
};