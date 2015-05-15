
/**
 * post-item-link.js
 *
 * Template for simple post content in home page
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

	var item = h('div.m-post', [
		h('p.m-meta', [
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