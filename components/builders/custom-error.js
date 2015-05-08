
/**
 * custom-error.js
 *
 * Render custom error page
 */

var templates = require('../templates/index');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	data.placeholder = templates.common.placeholder({ content: templates.common.customError(data) });

	return data;
};
