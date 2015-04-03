
/**
 * error.js
 *
 * Render error page
 */

var mainTemplate = require('../templates/page-landing');

var placeholderTemplate = require('../templates/common/placeholder');
var errorTemplate = require('../templates/errors/internal');

var headerPartial = require('./partials/header');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var error = errorTemplate({ i18n: data.i18n });
	var placeholder = placeholderTemplate({ content: error });
	var header = headerPartial(data);

	var mainModel = {};
	mainModel.placeholder = placeholder;
	mainModel.heading = header.heading;
	mainModel.menu = header.menu;

	return mainTemplate(mainModel);
};
