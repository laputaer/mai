
/**
 * body.js
 *
 * Template for default page body
 */

var $ = require('./vdom');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var body = $('body', data.page);

	return body;
};
