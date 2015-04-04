
/**
 * landing.js
 *
 * Render landing page body
 */

var welcomeTemplate = require('../templates/landing/welcome');
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
	data.placeholder = placeholderTemplate({ content: welcomeTemplate(data) });

	return bodyBuilder(data);
};
