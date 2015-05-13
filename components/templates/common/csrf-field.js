
/**
 * csrf-field.js
 *
 * Create a CSRF token field for form validation
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
	var csrf = h('input.m-csrf-token', {
		type: 'hidden'
		, value: data.csrf_token
		, name: 'csrf_token'
	});

	return csrf;
};
