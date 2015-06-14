
/**
 * home.js
 *
 * Render generic home page
 */

var templates = require('../templates/index');
var immutable = require('./immutable');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	var output = {};

	output.post_list = data.posts.map(function(post) {
		return immutable(templates.common.preview, post);
	});

	output.main = templates.page.home(output);

	return output;
};
