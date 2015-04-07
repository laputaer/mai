
/**
 * container.js
 *
 * Template for user club container
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
	var container = h('div.user-club', [
		data.add_club
		, data.search_club
		, data.my_club
	]);

	return container;
};