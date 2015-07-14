
/**
 * load-button.js
 *
 * Template for load more button
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
	var load = $('div.page-load-button', $('div.wrapper', [
		$('a', {
			href: '#'
		}, i18n.t(data.title))
	]));

	return load;
};