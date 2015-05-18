
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
	var xss = data.xss;
	var post = data.post;

	if (!post || !post.og) {
		return;
	}

	var og = post.og;

	var item = h('div.m-post', [
		h('p.m-meta', [
			h('a.m-link', {
				href: '/u/' + xss.path(post.user)
			}, [
				h('span', xss.data(post.user_name))
			])
			, h('span', i18n.t('club.activity-item-1'))
			, h('a.m-link', {
				href: '/c/' + xss.path(post.club)
			}, [
				h('span', xss.data(post.club_name))
			])
			, h('span', i18n.t('club.activity-item-2'))
			, h('a.m-link', {
				href: xss.url(og.site_url)
				, target: '_blank'
			}, [
				h('span', xss.data(og.site_name))
			])
			, h('span', i18n.t('club.activity-item-3'))
			, h('a.m-link', {
				href: xss.url(og.url)
				, target: '_blank'
			}, [
				h('span', xss.data(og.title))
			])
		])
	]);

	return item;
};