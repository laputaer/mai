
/**
 * restore-item.js
 *
 * Restore item from a list
 */

'use strict';

/**
 * Restore item
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function restoreItem (app, data) {
	var deleted_path = [data.view, data.order, 'deleted'];
	app.modify(deleted_path, false);
	app.refresh();
};
