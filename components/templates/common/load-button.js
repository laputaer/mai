
/**
 * load-button.js
 *
 * Template for load more button
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
	var buttonOpts = {
		id: data.key
		, key: data.key
		, className: 'page-load-button'
	};

	var linkOpts = {
		href: data.link || '#'
		, className: 'wrapper'
	};

	// default button event
	if (data.eventName) {
		linkOpts['ev-click'] = emitter.capture(data.eventName, data.eventData);
	}

	// custom button event
	if (data.eventType && data.eventHandler) {
		linkOpts[data.eventType] = data.eventHandler;
	}

	var load = $('div', buttonOpts, $('a', linkOpts, i18n.t(data.title)));

	return load;
};