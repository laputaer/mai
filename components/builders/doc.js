
/**
 * doc.js
 *
 * Render document
 */

var main = require('../templates/doc.js');

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
	mainModel.body = [];
	mainModel.body.push(data.parts);

	return main(mainModel);
};
