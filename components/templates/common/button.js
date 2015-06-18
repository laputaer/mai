
/**
 * button.js
 *
 * Template for default buttons
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

	// icon should be optional too
	var icon;
	if (data.icon) {
		icon = $('svg', {
			'class': 'm-icon'
		}, [
			$('use', {
				'xlink:href': base_url + '/assets/icons.svg?' + data.version + '#' + data.icon
			})
		]);
	}

	var button = $('a.m-button.rounded' + button_type, {
		href: data.href
		, target: data.target || undefined
	}, [
		icon
		, $('span.m-text', data.text)
	]);

	return button;
};