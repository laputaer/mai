
/**
 * add-club.js
 *
 * Template for default add club section
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
	var club = h('div.club-add', [
		data.club_create_button
		, h('p.line', i18n.t('club.create-message'))
		, h('p.line', i18n.t('club.create-stats', {
			current: user.action_point
			, base: user.action_base
		}))
	]);

	return club;
};