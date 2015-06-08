
/**
 * form-error.js
 *
 * Template for generic form errors
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
	var flash = data.flash;

	if (!flash) {
		return;
	}

	var error = $('div.m-section.error', [
		$('p.m-line', flash.message)
	]);

	return error;
};