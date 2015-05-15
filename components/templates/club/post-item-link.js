
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

	if (!post || !post.og) {
		return;
	}

	var og = post.og;

	var item = h('div.m-post', [
		h('p.m-meta', [
			h('a.m-link', {
				href: '/u/' + post.user
			}, [
				h('span', post.user_name)
			])
			, h('span', i18n.t('club.activity-item-1'))
			, h('a.m-link', {
				href: '/c/' + post.club
			}, [
				h('span', post.club_name)
			])
			, h('span', i18n.t('club.activity-item-2'))
			, h('a.m-link', {
				href: og.site_url
				, target: '_blank'
			}, [
				h('span', og.site_name)
			])
			, h('span', i18n.t('club.activity-item-3'))
			, h('a.m-link', {
				href: og.url
				, target: '_blank'
			}, [
				h('span', og.title)
			])
		])
	]);

	return item;
};