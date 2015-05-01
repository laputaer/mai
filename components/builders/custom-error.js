
/**
 * custom-error.js
 *
 * Render custom error page
 */

var customErrorTemplate = require('../templates/common/custom-error');
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
	data.placeholder = placeholderTemplate({ content: customErrorTemplate(data) });

	return bodyBuilder(data);
};
