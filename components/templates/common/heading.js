
/**
 * heading.js
 *
 * Template for default heading
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
	var heading = $('div.page-heading', [
		$('h1.page-heading-title.main', i18n.t('common.domain'))
		, $('p.page-heading-title.tagline', i18n.t('common.tagline'))
	]);

	return heading;
};