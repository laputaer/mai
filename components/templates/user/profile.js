
/**
 * container.js
 *
 * Template for user profile container
 */

var $ = require('../vdom');

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

	var profile = $('div.m-rows', [
		$('div.m-profile.m-row-1', [
			$('img.m-avatar.lazyload', {
				src: user.full_avatar + '&size=100'
				, alt: user.name + i18n.t('placeholder.avatar-preview')
				, attributes: {
					'data-srcset': user.full_avatar + '&size=100 100w, ' + user.full_avatar + '&size=200 200w, ' + user.full_avatar + '&size=400 400w'
					, 'data-sizes': 'auto' 
				}
			})
			, $('div.m-info', [
				$('p.m-title', user.name)
				, $('p.m-owner', [
					$('span', i18n.t('user.oauth-origin'))
					, $('a.m-link.external', {
						href: user.user_origin
						, target: '_blank'
					}, [
						$('span.m-text.m-cap', user.provider)
					])
				])
				, $('p.m-stat', [
					$('span', i18n.t('user.current-action-point'))
					, $('span.m-stat-value', user.action_point.toString())
				])
				, $('p.m-stat', [
					$('span', i18n.t('user.base-action-point'))
					, $('span.m-stat-value', user.action_base.toString())
				])
			])
		])
		, $('div.m-content.m-row-2', [
			$('div.m-section.green.lead', [
				$('h2.m-subtitle', i18n.t('club.user-result'))
				, $('div.m-list', data.post_list)
			])
		])
	]);

	return profile;
};