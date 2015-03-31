
/**
 * landing.js
 *
 * Render landing page body
 */

var main = require('../templates/page-landing');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var mainModel = {};
	mainModel.i18n = data.i18n;

	return main(mainModel);
};
