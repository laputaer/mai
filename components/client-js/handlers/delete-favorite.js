
/**
 * delete-favorite.js
 *
 * Update post favorite status
 */

module.exports = function deleteFavorite (app, order) {
	var fav_point_path = ['featured_posts', order, 'fav_point'];
	var fav_point = app.read(fav_point_path) || 0;
	app.modify(fav_point_path, fav_point - 1);
	app.modify(['featured_posts', order, 'current_user_fav'], false);
	app.refresh();
};
