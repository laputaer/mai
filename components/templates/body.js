
/**
 * body.js
 *
 * Template for default page body
 */

var $ = require('./vdom');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var main = $('div.page#page', [
		data.heading
		, data.menu
		, data.main
		, data.placeholder
		, data.mobile_menu
	]);

	return main;
};
