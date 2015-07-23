
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
	var avatar, text, buttonOpts, avatarOpts;

	// button options
	buttonOpts = {
		href: data.href || '#'
		, className: data.className || ''
		, title: data.title || undefined
	};

	// button events
	if (data.eventName && data.eventHandler) {
		buttonOpts[data.eventName] = data.eventHandler;
	}

	// button icon
	avatarOpts = {};

	// icon can be missing
	if (data.icon) {
		avatarOpts.style = {
			'background-image': 'url(' + data.icon + '&size=sq-tiny)'
		}
	}

	avatar = $('div.m-icon.m-avatar', avatarOpts);

	// button text
	text = $('span.m-text', data.text);

	var button = $('a.m-button', buttonOpts, [ avatar, text ]);
	return button;
};
