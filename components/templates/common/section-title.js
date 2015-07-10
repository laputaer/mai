
/**
 * section-title.js
 *
 * Template for page section title
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
	var title = $('div.page-section-title', $('div.wrapper', [
		$('h2.title', i18n.t(data.title))
	]));

	return title;
};