
/**
 * navigation-button.js
 *
 * Template for default navigation button
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var icon, text, buttonOpt;

	// button options
	buttonOpt = {
		href: data.href || '#'
		, className: data.className || ''
	};

	// button events
	if (data.eventName && data.eventHandler) {
		buttonOpt[data.eventName] = data.eventHandler;
	}

	// button icon
	if (data.icon && data.version) {
		icon = $('svg', {
			'class': 'm-icon'
		}, [
			$('use', {
				'xlink:href': '/assets/icons.svg?' + data.version + '#' + data.icon
			})
		]);
	}

	// button text
	if (data.text !== undefined) {
		text = $('span.m-text', i18n.t(data.text));
	}

	var button = $('a.m-button', buttonOpt, [ icon, text ]);
	return button;
};
