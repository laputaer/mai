
/**
 * user-button.js
 *
 * Template for default user buttons
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
	avatar = $('img.m-icon.m-avatar', {
		src: data.icon
	});

	// button text
	text = $('span.m-text', data.text);

	var button = $('a.m-button', buttonOpt, [ avatar, text ]);
	return button;
};
