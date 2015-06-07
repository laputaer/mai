
/**
 * form-button.js
 *
 * Template for default single submit button
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
	// optional data.type to pass button variant names
	var button_type = '';
	if (data.type && data.type.length > 0) {
		button_type = '.' + data.type.join('.');
	}

	var base_url = '';

	var button = $('button.m-button' + button_type, {
		'type': 'submit'
		, 'name': data.name || ''
		, 'value': data.value || ''
	}, [
		$('svg.m-icon', [
			$('use', {
				'xlink:href': base_url + '/assets/icons.svg?' + data.version + '#' + data.icon
			})
		])
		, $('span.m-text', data.text)
	]);

	return button;
};