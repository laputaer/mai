
/**
 * create-favorite.js
 *
 * Update post favorite status
 */

'use strict';

/**
 * Create favorite
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function createFavorite (app, data) {
	var fav_point_path = [data.view, data.order, 'fav_point'];
	var fav_point = app.read(fav_point_path) || 0;
	app.modify(fav_point_path, fav_point + 1);
	app.modify([data.view, data.order, 'current_user_fav'], true);
	app.refresh();
};
