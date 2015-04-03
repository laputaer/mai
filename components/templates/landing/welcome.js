
/**
 * welcome.js
 *
 * Template for default welcome message
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
	var welcome = h('div.welcome', [
		h('p.line', i18n.t('main.line-1'))
		, h('p.line', i18n.t('main.line-2'))
		, h('p.line', i18n.t('main.line-3'))
		, h('p.line', i18n.t('main.line-4'))
	]);

	return welcome;
};