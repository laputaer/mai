
/**
 * internal.js
 *
 * Template for internal service errors
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
	var error = h('div.error', [
		h('p.line', i18n.t('main.error'))
	]);

	return error;
};