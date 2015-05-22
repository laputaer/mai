
/**
 * profile.js
 *
 * Template for club profile
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
	var club = data.club;
	var owner = data.owner;
	var user = data.user;

	var avatar;
	if (club.full_avatar) {
		avatar = h('img.m-avatar', {
			src: club.full_avatar
		});
	} else {
		avatar = h('div.m-avatar', [
			h('span.m-letter', xss.data(club.initials))
		]);
	}

	var intro;
	if (club.intro) {
		intro = h('p.m-line', i18n.t('club.owner-intro', {
			intro: xss.data(club.intro)
		}));
	}

	var author, license;
	if (club.oembed) {
		author = h('p.m-copyright', [
			h('span', i18n.t('club.image-source'))
			, h('a.m-link', {
				target: '_blank'
				, href: xss.url(club.avatar_source)
			}, [
				h('span.m-text',  xss.data(i18n.t('club.image-source-url', {
					provider: club.avatar_domain
				})))
			])
		]);

		license = h('p.m-copyright', [
			h('span', i18n.t('club.image-copyright'))
			, h('a.m-link', {
				target: '_blank'
				, href: xss.url(club.avatar_home)
			}, [
				h('span.m-text', i18n.t('club.image-copyright-url'))
			])
		]);
	}

	var action_cost;
	if (user && data.club_join) {
		action_cost = h('p.m-line.note', i18n.t('club.join-stats', {
			current: user.action_point
			, base: user.action_base
		}));
	}

	var container = h('div.m-rows', [
		h('div.m-profile.m-row-1', [
			avatar
			, h('div.m-info', [
				h('p.m-title', xss.data(club.title))
				, h('p.m-owner', [
					h('span', i18n.t('club.owner'))
					, h('a.m-link', {
						href: '/u/' + xss.path(owner.uid)
					}, [
						h('span.m-text', xss.data(owner.login))
					])
				])
				, h('p.m-stat', [
					h('span', i18n.t('club.level', {
						custom: xss.data(club.custom)
					}))
					, h('span.m-stat-value', i18n.t('club.lv' + club.level))
				])
				, h('p.m-stat', [
					h('span', i18n.t('club.member-count'))
					, h('span.m-stat-value', xss.data(club.members))
				])
				, h('p.m-stat', [
					h('span', i18n.t('club.total-point'))
					, h('span.m-stat-value', xss.data(club.points))
				])
				, author
				, license
			])
		])
		, h('div.m-content.m-row-2', [
			data.club_form_error
			, h('div.m-section.yellow.lead', [
				h('h2.m-subtitle', i18n.t('club.welcome-intro'))
				, h('p.m-line', i18n.t('club.welcome-message', {
					title: xss.data(club.title)
				}))
				, intro
				, data.club_management
				, data.share_button
				, h('form.m-form', {
					action: '/c/' + xss.path(club.slug) + '/memberships'
					, method: 'POST'
				}, [
					data.csrf_field
					, data.club_join
					, data.club_leave
				])
				, action_cost
			])
			, h('div.m-section.green', [
				h('h2.m-subtitle', i18n.t('club.message-board'))
				, data.add_post
				, h('div.m-list', data.post_list)
			])
		])
	]);

	return container;
};