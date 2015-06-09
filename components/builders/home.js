
/**
 * home.js
 *
 * Render generic home page
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
	data.post_list = data.posts.map(function(post) {
		return templates.common.preview({
			post: post
		});
	});

	data.main = templates.page.home(data);

	return data;
};
