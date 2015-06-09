
/**
 * placeholder.js
 *
 * Template for placeholder container
 */

var $ = require('../vdom');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var placeholder = $('div.m-rows', [
		$('div.m-row-2.m-content.placeholder', data.content)
	]);

	return placeholder;
};