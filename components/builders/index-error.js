
/**
 * index-error.js
 *
 * Error template builder
 */

var builders = require('./builders');
var templates = require('../templates/index');

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	data.main = templates.page.errorPage(data);

	return builders.doc(data);
};
