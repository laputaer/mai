
/**
 * home.js
 *
 * Render home body
 */

var mainTemplate = require('../templates/page-landing');

var placeholderTemplate = require('../templates/common/placeholder');
var profileTemplate = require('../templates/user/profile');

var headerPartial = require('./partials/header');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var profile = profileTemplate({ i18n: data.i18n, user: data.user });
	var placeholder = placeholderTemplate({ content: profile });
	var header = headerPartial(data);

	var mainModel = {};
	mainModel.placeholder = placeholder;
	mainModel.heading = header.heading;
	mainModel.menu = header.menu;

	return mainTemplate(mainModel);
};
