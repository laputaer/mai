
/**
 * button.js
 *
 * Template for default buttons
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
	// optional data.type to pass button variant names
	var button_type = '';
	if (data.type && data.type.length > 0) {
		button_type = '.' + data.type.join('.');
	}

	// icon should be optional too
	var icon;
	if (data.icon) {
		icon = svg('svg.m-icon', [
			svg('use', {
				'xlink:href': '/assets/icons.svg?' + data.version + '#' + data.icon
			})
		]);
	}

	var button = h('a.m-button.rounded' + button_type, {
		'href': data.href
	}, [
		icon
		, h('span.m-text', data.text)
	]);

	return button;
};