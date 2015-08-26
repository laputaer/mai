
/**
 * delete-item.js
 *
 * Delete item from a list
 */

/**
 * Delete item
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function deleteItem (app, data) {
	var deleted_path = [data.view, data.order, 'deleted'];
	app.modify(deleted_path, true);
	app.refresh();
};
