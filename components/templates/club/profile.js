
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
		avatar = h('div.m-avatar', {
			style: {
				'background-image': 'url(' + club.full_avatar + ')'
			}
		});
	} else {
		avatar = h('div.m-avatar', [
			h('span.m-letter', xss.data(club.initials))
		]);
	}

	var intro;
	if (club.intro) {
		intro = h('p.m-line', i18n.t('club.owner-intro', club));
	}

	var author, license;
	if (club.oembed) {
		author = h('p.m-copyright', [
			h('span', i18n.t('club.image-author'))
			, h('a.m-link', {
				target: '_blank'
				, href: club.oembed.source
			}, [
				h('span.m-text', club.oembed.author)
			])
		]);

		license = h('p.m-copyright', [
			h('span', i18n.t('club.image-license'))
			, h('a.m-link', {
				target: '_blank'
				, href: club.oembed.license ? club.oembed.license : club.oembed.domain
			}, [
				h('span.m-text', club.oembed.license_name ? club.oembed.license_name : i18n.t('club.image-copyright', club.oembed))
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
						href: '/u/' + owner.uid
					}, [
						h('span.m-text', owner.login)
					])
				])
				, h('p.m-stat', [
					h('span', i18n.t('club.level', club))
					, h('span.m-stat-value', i18n.t('club.lv' + club.level))
				])
				, h('p.m-stat', [
					h('span', i18n.t('club.member-count'))
					, h('span.m-stat-value', club.members.toString())
				])
				, h('p.m-stat', [
					h('span', i18n.t('club.total-point'))
					, h('span.m-stat-value', club.points.toString())
				])
				, author
				, license
			])
		])
		, h('div.m-content.m-row-2', [
			data.club_form_error
			, h('div.m-section.lead', [
				data.club_management
				, h('form', {
					action: '/c/' + club.slug + '/memberships'
					, method: 'POST'
				}, [
					data.csrf_field
					, data.club_join
					, data.club_leave
				])
				, action_cost
			])
			, h('div.m-section.blue', [
				h('h2.m-subtitle', i18n.t('club.welcome-intro'))
				, h('p.m-line', i18n.t('club.welcome-message', club))
				, intro
			])
			, h('div.m-section.green', [
				h('h2.m-subtitle', i18n.t('club.message-board'))
			])
		])
	]);

	return container;
};