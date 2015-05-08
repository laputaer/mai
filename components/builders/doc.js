
/**
 * doc.js
 *
 * Render document
 */

var templates = require('../templates/index');

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	return templates.doc(data);
};
