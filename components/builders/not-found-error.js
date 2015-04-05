
/**
 * not-found-error.js
 *
 * Render content not found error page
 */

var notFoundTemplate = require('../templates/common/not-found-error');
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
	data.placeholder = placeholderTemplate({ content: notFoundTemplate(data) });

	return bodyBuilder(data);
};
