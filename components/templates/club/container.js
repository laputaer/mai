
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
	var sections = [];
	var names = ['add_club', 'search_club', 'search_club_results', 'my_club', 'my_joined_club', 'club_form_error', 'club_form'];

	names.forEach(function(name) {
		if (data.hasOwnProperty(name)) {
			sections.push(data[name]);
		}
	})

	var container = h('div.user-club', sections);

	return container;
};