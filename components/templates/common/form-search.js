
/**
 * form-search.js
 *
 * Template for default form search group
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
	var search = h('div.m-search', [
		h('input.m-field' + data.error, {
			placeholder: data.placeholder
			, name: data.name
			, value: data.value
		})
		, h('button.m-submit', {
			type: 'submit'
		}, data.submit_text)
	]);

	return search;
};