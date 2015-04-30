
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
	var club = data.club;
	var owner = data.owner;
	var user = data.user;

	var container = h('div.club-profile', [
		h('div.profile', [
			h('div.avatar', [
				h('span.letter', club.title.substr(0, 2))
			])
			, h('div.info', [
				h('p.title', club.title)
				, h('p.owner', [
					h('span.text', i18n.t('club.club-owner', club))
					, h('a.m-link', {
						href: '/u/' + owner.uid
					}, [
						h('span.m-text', owner.login)
					])
				])
			])
		])
		, 
		, h('div.m-content.welcome', [
			h('p.line', i18n.t('club.welcome-to-the-club', club))
			, h('p.line', i18n.t('club.welcome-club-stats', club))
			, h('p.line', [
				data.join_club_button
				, data.share_club_button
			])
			, h('p.line', i18n.t('club.join-stats', {
				current: user.action_point
				, base: user.action_base
			}))
		])
	]);

	return container;
};