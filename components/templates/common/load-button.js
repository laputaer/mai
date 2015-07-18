
/**
 * load-button.js
 *
 * Template for load more button
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
	var buttonOpts = {};

	if (data.key) {
		buttonOpts.id = data.key;
		buttonOpts.key = data.key;
	}

	var linkOpts = {
		href: '#'
	};

	// button events
	if (data.eventName && data.eventHandler) {
		linkOpts[data.eventName] = data.eventHandler;
	}

	var load = $('div.page-load-button', buttonOpts, $('a.wrapper', linkOpts, i18n.t(data.title)));

	return load;
};