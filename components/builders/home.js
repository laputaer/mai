
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
	var flash = data.flash;
	var i18n = data.i18n;
	var xss = data.xss;

	data.post_list = data.posts.map(function(post) {
		return templates.club.postItemLink({
			post: post
			, i18n: i18n
			, xss: xss
		});
	});

	data.main = templates.page.home(data);

	return data;
};
