
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
		return templates.common.preview({
			post: post
		});
	});

	data.main = templates.user.profile(data);

	data.page_title = data.user.name + ' (' + data.user.login + ')';

	data.page_opengraph = {
		title: data.page_title
		, url: data.canonical_url
		, image: data.user.full_avatar + '&size=400'
	};

	return data;
};
