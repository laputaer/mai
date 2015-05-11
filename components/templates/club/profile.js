
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

	var copyright;
	if (club.oembed) {
		copyright = h('p.m-copyright', [
			h('span', i18n.t('club.image-copyright'))
			, h('a.m-link', {
				href: club.oembed.source
			}, [
				h('span.m-text', club.oembed.author)
			])
		]);
	}

	var action_cost;
	if (user && data.club_join) {
		action_cost = h('p.secondary', i18n.t('club.join-stats', {
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
				, copyright
			])
		])
		, h('div.m-content.m-row-2', [
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
			, h('p.line', i18n.t('club.welcome-message', club))
			, h('p.line', [
				i18n.t('club.welcome-stats', club)
				, ' (' + i18n.t('club.lv' + club.level, club) + ')'
			])
			, h('p.subtitle', i18n.t('club.welcome-intro'))
			, h('p.line', club.intro)
		])
	]);

	return container;
};