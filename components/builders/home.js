
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
	data.post_list = data.posts.map(function(post) {
		return immutable(templates.common.preview, post);
	});

	data.main = templates.page.home(data);

	return data;
};
