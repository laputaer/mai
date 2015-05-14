
/**
 * user-profile.js
 *
 * Render user profile body
 */

var templates = require('../templates/index');

module.exports = renderer;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function renderer(data) {
	data.main = templates.user.profile(data);

	return data;
};
