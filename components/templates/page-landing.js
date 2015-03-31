
/**
 * page-landing.js
 *
 * Template for landing page body
 */

var h = require('virtual-dom/h');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;
	var main = h('div.page', i18n.t('test.hello'));

	return main;
};
