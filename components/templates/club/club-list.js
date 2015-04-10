
/**
 * club-list.js
 *
 * Template for listing clubs
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

	var buttons = data.my_club_buttons.map(function(button) {
		return h('li.item', button);
	});
	var count = buttons.length;

	if (count > 0) {
		buttons = h('ul.list', buttons);
	}

	var list = h('div.club-list', [
		h('p.line', i18n.t('club.my-club-list', { count: count }))
		, buttons
	]);

	return list;
};