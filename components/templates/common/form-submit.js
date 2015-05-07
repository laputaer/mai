
/**
 * form-submit.js
 *
 * Template for default form submit group
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
	var group = h('div.m-group.m-last-cell', [
		h('button.m-submit', {
			type: 'submit'
		}, data.text)
	]);

	return group;
};