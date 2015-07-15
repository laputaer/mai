
/**
 * post-button.js
 *
 * Template for default post buttons
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
	var avatar, text, buttonOpt;

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
	avatar = $('div.m-icon.m-avatar', {
		style: {
			'background-image': 'url(' + data.icon + '&size=sq-tiny)'
		}
	});

	// button text
	text = $('span.m-text', data.text);

	var button = $('a.m-button', buttonOpt, [ avatar, text ]);
	return button;
};
