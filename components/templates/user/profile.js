
/**
 * container.js
 *
 * Template for user profile container
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
	var user = data.user;

	var profile = h('div.m-rows', [
		h('div.m-profile.m-row-1', [
			h('img.m-avatar.lazyload', {
				src: user.full_avatar + '&size=100'
				, alt: xss.attr(user.name) + i18n.t('placeholder.avatar-preview')
				, attributes: {
					'data-srcset': user.full_avatar + '&size=100 100w, ' + user.full_avatar + '&size=200 200w, ' + user.full_avatar + '&size=400 400w'
					, 'data-sizes': 'auto' 
				}
			})
			, h('div.m-info', [
				h('p.m-title', xss.data(user.name))
				, h('p.m-owner', [
					h('span', i18n.t('user.oauth-origin'))
					, h('a.m-link', {
						href: xss.url(user.user_origin)
					}, [
						h('span.m-text.cap', xss.data(user.provider))
					])
				])
				, h('p.m-stat', [
					h('span', i18n.t('user.current-action-point'))
					, h('span.m-stat-value', xss.data(user.action_point))
				])
				, h('p.m-stat', [
					h('span', i18n.t('user.base-action-point'))
					, h('span.m-stat-value', xss.data(user.action_base))
				])
			])
		])
		, h('div.m-content.m-row-2', [
			h('div.m-section.green.lead', [
				h('h2.m-subtitle', i18n.t('club.user-result'))
				, h('div.m-list', data.post_list)
			])
		])
	]);

	return profile;
};