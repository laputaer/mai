
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
	var names = ['add_club', 'search_club', 'my_club', 'club_form', 'club_form_error'];

	names.forEach(function(name) {
		if (data.hasOwnProperty(name)) {
			sections.push(data[name]);
		}
	})

	var container = h('div.user-club', sections);

	return container;
};