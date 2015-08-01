
/**
 * index-error.js
 *
 * Error template builder
 */

var builders = require('./builders');

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	data = builders.error(data);

	return builders.doc(data);
};
