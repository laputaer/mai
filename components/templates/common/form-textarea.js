
/**
 * form-textarea.js
 *
 * Template for default form textarea group
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
	var group = $('div.m-group.m-cell', [
		$('label.m-label' + data.error, {
			attributes: {
				'for': data.id
			}
		}, data.label)
		, $('textarea.m-field' + data.error, {
			placeholder: data.placeholder
			, name: data.name
			, id: data.id
		}, data.value)
		, $('span.m-note', data.note)
	]);

	return group;
};