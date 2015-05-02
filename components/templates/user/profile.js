
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
	var profile = h('div.m-home', [
		h('div.m-profile.user-profile', [
			h('div.m-avatar', {
				style: {
					'background-image': 'url(' + user.full_avatar + ')'
				}
			})
			, h('div.m-info', [
				h('p.m-title', user.name)
				, h('p.m-owner', [
					h('span', data.i18n.t('user-profile.from'))
					, h('a.m-link', {
						href: user.user_origin
					}, [
						h('span.m-text.m-lang.cap', {
							lang: 'en'
						}, user.provider)
					])
				])
				/*
				, h('p.m-level', i18n.t('user-profile.faith', {
					current: user.action_point
					, base: user.action_base
				}))
				, data.user_from
				*/
			])
		])
		, h('div.m-content', [
			h('p.line', i18n.t('user-profile.placeholder-1'))
			, h('p.line', {
				innerHTML: i18n.t('user-profile.placeholder-2', {
					feedback: '<a href="https://github.com/maihq/feedbacks" class="link">Github</a>'
					, developer: '<a href="https://twitter.com/bitinn" class="link">@bitinn</a>'
				})
			})
		])
	]);

	return profile;
};