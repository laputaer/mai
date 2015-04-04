
/**
 * oauth-error.js
 *
 * Render oauth provider error
 */

var errorTemplate = require('../templates/common/oauth-error');
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
	data.placeholder = placeholderTemplate({ content: errorTemplate(data) });

	return bodyBuilder(data);
};
