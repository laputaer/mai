
/**
 * form-error.js
 *
 * Template for generic form errors
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;
	var msg = '';
	if (data.flash.messageData) {
		msg = i18n.t(data.flash.message, data.flash.messageData);
	} else {
		msg = i18n.t(data.flash.message);
	}

	var error = h('div.m-box.error', [
		h('p.line', msg)
	]);

	return error;
};