
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
	var icon, image, text, buttonOpts;

	// button options
	buttonOpts = {
		href: data.href || '#'
		, className: data.className || ''
	};

	// button target
	if (data.target) {
		buttonOpts.target = data.target;
	}

	// button events
	if (data.eventName && data.eventHandler) {
		buttonOpts[data.eventName] = data.eventHandler;
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

		image = $('div.m-icon.m-avatar', {
			style: {
				'background-image': 'url(' + url + ')'
			}
		});
	}

	// button text
	if (data.text !== undefined) {
		text = $('span.m-text', i18n.t(data.text));
	}

	// button value
	if (data.value !== undefined) {
		text = $('span.m-text', data.value.toString());
	}

	var button = $('a.m-button', buttonOpts, [ icon, image, text ]);
	return button;
};
