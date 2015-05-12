
/**
 * heading.js
 *
 * Template for default heading
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
	var heading = h('div.page-heading', [
		h('h1.page-heading-title.main', i18n.t('common.domain'))
		, h('p.page-heading-title.tagline', i18n.t('common.tagline'))
	]);

	return heading;
};