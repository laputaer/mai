
/**
 * my.js
 *
 * Render user home
 */

var userTemplate = require('../templates/user/profile');
var placeholderTemplate = require('../templates/common/placeholder');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	data.placeholder = placeholderTemplate({ content: userTemplate(data) });

	return bodyBuilder(data);
};
