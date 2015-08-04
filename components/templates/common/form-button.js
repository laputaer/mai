
/**
 * form-button.js
 *
 * Template for default single submit button
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
	var icon, text, buttonOpts;

	// button options
	buttonOpts = {
		type: 'submit'
		, 'ev-submit': emitter.capture('page:form:submit')
	};

	// button text
	if (data.text !== undefined) {
		text = $('span.text', i18n.t(data.text));
	}

	var button = $('button.form-button', buttonOpts, [ icon, text ]);
	return button;
};