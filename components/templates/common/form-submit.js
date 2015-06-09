
/**
 * form-submit.js
 *
 * Template for default form submit group
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
	var group = $('div.m-group.m-full-cell', [
		$('button.m-submit', {
			type: 'submit'
		}, data.text)
	]);

	return group;
};