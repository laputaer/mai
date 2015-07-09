
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
	var active = (data.ui && data.ui.nav) ? ' active' : '';

	var discover = $('div', {
		className: 'page-discover' + active
	});

	return discover;
};