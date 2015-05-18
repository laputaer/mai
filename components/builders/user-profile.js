
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
	data.post_list = data.posts.map(function(post) {
		return templates.club.postItemLink({
			post: post
			, i18n: data.i18n
			, xss: data.xss
		});
	});

	data.main = templates.user.profile(data);

	return data;
};
