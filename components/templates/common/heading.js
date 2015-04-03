
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
	var heading = h('div.heading', [
		h('h1.title.lang', {
			lang: 'en'
		}, i18n.t('heading.title-1'))
		, h('p.subtitle', i18n.t('heading.subtitle-1'))
	]);

	return heading;
};