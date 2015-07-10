
/**
 * home.js
 *
 * Render generic home page
 */

var immutable = require('./immutable');
var templates = require('../templates/index');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	data.main = templates.page.home(data);

	return data;
};
