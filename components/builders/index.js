
/**
 * index.js
 *
 * Centralized template builder
 */

var templates = require('../templates/index');
var builders = require('./builders');

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	data = builders.clubEditor(data);

	data.body.push(builders.body(data));

	return templates.doc(data);
};
