
/**
 * navigation-button.js
 *
 * Template for default navigation button
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var icon, image, text;

	// button options
	var buttonOpts = {
		href: data.href || '#'
		, className: 'm-button'
	};

	// button class
	if (data.className) {
		buttonOpts.className += ' ' + data.className;
	}

	// button title
	if (data.title) {
		buttonOpts.title = data.title;
	}

	// button target
	if (data.target) {
		buttonOpts.target = data.target;
	}

	// button event, click
	if (data.eventName) {
		buttonOpts['ev-click'] = emitter.capture(data.eventName, data.eventData);
	}

	// button event, custom
	if (data.eventType && data.eventHandler) {
		buttonOpts[data.eventType] = data.eventHandler;
	}

	// button icon
	if (data.icon && data.version) {
		var iconOpts = {
			attributes: {
				'class': 'm-icon'
			}
		};

		if (data.client === false) {
			iconOpts.attributes.class += ' m-hint';
		}

		icon = $('svg', iconOpts, [
			$('use', {
				'xlink:href': '/assets/icons.svg?' + data.version + '#' + data.icon
			})
		]);
	}

	// button image
	if (data.image) {
		var url = data.image;

		if (data.size) {
			url += '&size=' + data.size;
		}

		if (data.version) {
			url += '?' + data.version;
		}

		var imageOpts = {
			className: 'm-icon m-avatar'
			, style: {
				'background-image': 'url(' + url + ')'
			}
		};

		image = $('div', imageOpts);
	}

	// button fallback
	if (data.fallback && !image) {
		image = $('div.m-icon.m-avatar');
	}

	// button text
	if (data.text !== undefined) {
		text = $('span.m-text', i18n.t(data.text));
	}

	// button value
	if (data.value !== undefined) {
		text = $('span.m-text', data.value.toString());
	}

	var button = $('a', buttonOpts, [ icon, image, text ]);
	return button;
};
