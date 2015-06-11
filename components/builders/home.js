
/**
 * home.js
 *
 * Render generic home page
 */

var templates = require('../templates/index');
var immutable = require('../templates/immutable');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	data.post_list = data.posts.map(function(post) {
		return immutable(templates.common.preview, post);
	});

	data.main = templates.page.home(data);

	return data;
};
