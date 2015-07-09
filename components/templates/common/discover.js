
/**
 * discover.js
 *
 * Template for discover menu
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
	var discover = $('div.page-discover');

	return discover;
};