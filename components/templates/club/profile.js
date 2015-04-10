
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

	var pid = owner.uid.split('_');
	pid = pid[0].substr(0, 1) + pid[1];

	var container = h('div.club-profile', [
		h('div.profile', [
			h('div.avatar', [
				h('span.letter', club.title.substr(0, 2))
			])
			, h('p.title', club.title)
			, h('p.owner', [
				h('span.text', i18n.t('club.club-owner', club))
				, h('a.link', {
					href: '/u/' + pid
				}, owner.login)
			])
		])
		, h('div.welcome', [
			h('p.line', i18n.t('club.welcome-to-the-club', club))
		])
	]);

	return container;
};