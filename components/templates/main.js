
/**
 * main.js
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
	var main = $('div.page', [
		data.header
		, data.main
		, data.placeholder
		, data.footer
		, data.discover
	]);

	return main;
};
