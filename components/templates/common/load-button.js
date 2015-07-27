
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
	var buttonOpts = {
		id: data.key
		, key: data.key
		, className: 'page-load-button'
	};

	var linkOpts = {
		href: '#'
		, className: 'wrapper'
	};

	// button events
	if (data.eventName && data.eventHandler) {
		linkOpts[data.eventName] = data.eventHandler;
	}

	var load = $('div', buttonOpts, $('a', linkOpts, i18n.t(data.title)));

	return load;
};