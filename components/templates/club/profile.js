
/**
 * profile.js
 *
 * Template for club profile
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
	var club = data.club;
	var owner = data.owner;
	var user = data.user;

	var avatar;
	if (club.full_avatar) {
		avatar = $('img.m-avatar.lazyload', {
			src: club.full_avatar + '&size=100'
			, alt: club.title + i18n.t('placeholder.avatar-preview')
			, attributes: {
				'data-srcset': club.full_avatar + '&size=100 100w, ' + club.full_avatar + '&size=200 200w, ' + club.full_avatar + '&size=400 400w'
				, 'data-sizes': 'auto' 
			}
		});
	} else {
		avatar = $('div.m-avatar', [
			$('span.m-letter', club.initials)
		]);
	}

	var intro;
	if (club.intro) {
		intro = $('p.m-line', i18n.t('club.owner-intro', {
			intro: club.intro
		}));
	}

	var author, license;
	if (club.embed) {
		author = $('p.m-copyright', [
			$('span', i18n.t('club.image-source'))
			, $('a.m-link.external', {
				target: '_blank'
				, href: club.avatar_source
			}, [
				$('span.m-text', i18n.t('club.image-source-url', {
					provider: club.avatar_domain
				}))
			])
		]);
	}

	var action_cost;
	if (user && data.club_join) {
		action_cost = $('p.m-line.note', i18n.t('club.join-stats', {
			current: user.action_point
			, base: user.action_base
		}));
	}

	var container = $('div.m-rows', [
		$('div.m-profile.m-row-1', [
			avatar
			, $('div.m-info', [
				$('p.m-title', club.title)
				, $('p.m-owner', [
					$('span', i18n.t('club.owner'))
					, $('a.m-link', {
						href: '/u/' + owner.uid
					}, [
						$('span.m-text', owner.login)
					])
				])
				, $('p.m-stat', [
					$('span', i18n.t('club.level', {
						custom: club.custom
					}))
					, $('span.m-stat-value', i18n.t('club.lv' + club.level))
				])
				, $('p.m-stat', [
					$('span', i18n.t('club.member-count'))
					, $('span.m-stat-value', club.members.toString())
				])
				, $('p.m-stat', [
					$('span', i18n.t('club.total-point'))
					, $('span.m-stat-value', club.points.toString())
				])
				, author
				, license
			])
		])
		, $('div.m-content.m-row-2', [
			data.club_form_error
			, $('div.m-section.yellow.lead', [
				$('h2.m-subtitle', i18n.t('club.welcome-intro'))
				, $('p.m-line', i18n.t('club.welcome-message', {
					title: club.title
				}))
				, intro
				, data.club_management
				, data.share_button
				, $('form.m-form', {
					action: '/c/' + club.slug + '/memberships'
					, method: 'POST'
				}, [
					data.csrf_field
					, data.club_join
					, data.club_leave
				])
				, action_cost
			])
			, $('div.m-section.green', [
				$('h2.m-subtitle', i18n.t('club.message-board'))
				, data.add_post
				, $('div.m-list', data.post_list)
			])
		])
	]);

	return container;
};