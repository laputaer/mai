
/**
 * form-group.js
 *
 * Template for default form input group
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
	var group = h('div.m-group.m-cell', [
		h('label.m-label' + data.error, {
			attributes: {
				'for': data.id
			}
		}, data.label)
		, h('input.m-field' + data.error, {
			placeholder: data.placeholder
			, name: data.name
			, id: data.id
			, value: data.value
		})
		, h('span.m-note', data.note)
	]);

	return group;
};