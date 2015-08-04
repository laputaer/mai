
/**
 * form-button.js
 *
 * Template for default single submit button
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
	var icon, text, buttonOpts;

	// button options
	buttonOpts = {
		type: 'submit'
		, className: 'm-button rounded form-button'
	};

	// button text
	if (data.text !== undefined) {
		text = $('span.m-text', i18n.t(data.text));
	}

	var button = $('button', buttonOpts, [ icon, text ]);
	return button;
};
