
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

	var container = h('div.m-rows', [
		h('div.m-profile.m-row-1', [
			h('div.m-avatar', [
				h('span.m-letter', xss.data(club.initials))
			])
			, h('div.m-info', [
				h('p.m-title', xss.data(club.title))
				, h('p.m-owner', [
					h('span', xss.data(i18n.t('club.club-owner', club)))
					, h('a.m-link', {
						href: '/u/' + owner.uid
					}, [
						h('span.m-text', owner.login)
					])
				])
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
			, h('p.line', i18n.t('club.welcome-to-the-club', club))
			, h('p.line', i18n.t('club.welcome-club-stats', club))
			/*
			, h('p.line', i18n.t('club.join-stats', {
				current: user.action_point
				, base: user.action_base
			}))
			*/
		])
	]);

	return container;
};