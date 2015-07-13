
/**
 * button.js
 *
 * Template for default buttons
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
		, target: data.target || undefined
		, className: data.className || ''
	};

	// button events
	if (data.eventName && data.eventHandler) {
		buttonOpt[data.eventName] = data.eventHandler;
	}

	// button icon
	if (data.icon && data.base_url && data.version) {
		icon = $('svg', {
			'class': 'm-icon'
		}, [
			$('use', {
				'xlink:href': data.base_url + '/assets/icons.svg?' + data.version + '#' + data.icon
			})
		]);
	}

	// button text
	if (data.text) {
		text = $('span.m-text', i18n.t(data.text));
	}

	// button value
	if (data.value) {
		text = $('span.m-text', data.value);
	}

	var button = $('a.m-button', buttonOpt, [ icon, text ]);
	return button;
};