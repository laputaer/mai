
/**
 * landing.js
 *
 * Render landing page body
 */

var mainTemplate = require('../templates/page-landing');

var placeholderTemplate = require('../templates/common/placeholder');
var welcomeTemplate = require('../templates/landing/welcome');

var headerPartial = require('./partials/header');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var welcome = welcomeTemplate({ i18n: data.i18n });
	var placeholder = placeholderTemplate({ content: welcome });
	var header = headerPartial(data);

	var mainModel = {};
	mainModel.placeholder = placeholder;
	mainModel.heading = header.heading;
	mainModel.menu = header.menu;

	return mainTemplate(mainModel);
};
