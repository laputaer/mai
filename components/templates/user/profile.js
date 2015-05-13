
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
	var user = data.user;
	var profile = h('div.m-rows', [
		h('div.m-profile.m-row-1', [
			h('div.m-avatar', {
				style: {
					'background-image': 'url(' + user.full_avatar + ')'
				}
			})
			, h('div.m-info', [
				h('p.m-title', user.name)
				, h('p.m-owner', [
					h('span', i18n.t('user.oauth-origin'))
					, h('a.m-link', {
						href: user.user_origin
					}, [
						h('span.m-text.cap', user.provider)
					])
				])
				, h('p.m-stat', [
					h('span', i18n.t('user.current-action-point'))
					, h('span.m-stat-value', user.action_point.toString())
				])
				, h('p.m-stat', [
					h('span', i18n.t('user.base-action-point'))
					, h('span.m-stat-value', user.action_base.toString())
				])
			])
		])
		, h('div.m-content.m-row-2', [
			h('div.m-section.lead', [
				h('p.m-line', i18n.t('user.placeholder-1'))
				, h('p.m-line', {
					innerHTML: i18n.t('user.placeholder-2', {
						feedback: '<a href="https://github.com/maihq/feedbacks" class="link">Github</a>'
						, developer: '<a href="https://twitter.com/bitinn" class="link">@bitinn</a>'
					})
				})
			])
		])
	]);

	return profile;
};