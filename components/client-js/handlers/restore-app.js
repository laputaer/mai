
/**
 * restore-app.js
 *
 * Restore app profile
 */

/**
 * Restore app profile
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function restoreApp (app, data) {
	var deleted_path = [data.view, data.order, 'deleted'];
	app.modify(deleted_path, false);
	app.refresh();
};
