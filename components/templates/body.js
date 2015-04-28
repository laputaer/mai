
/**
 * body.js
 *
 * Template for default page body
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
	var main;
	if (data.main) {
		main = data.main;
	} else {
		main = data.placeholder;
	}

	var main = h('div.page', [
		h('div.global-header', [
			data.heading
			, data.menu
		])
		, main
	]);

	return main;
};
