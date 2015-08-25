
/**
 * delete-app.js
 *
 * Delete app profile
 */

/**
 * Delete app profile
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function deleteApp (app, data) {
	var deleted_path = [data.view, data.order, 'deleted'];
	app.modify(deleted_path, true);
	app.refresh();
};
