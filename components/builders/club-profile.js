
/**
 * club-profile.js
 *
 * Render club profile body
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
	data.main = templates.page.clubProfile(data);

	return data;
};
