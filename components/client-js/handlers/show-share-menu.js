
/**
 * show-share-menu.js
 *
 * Display share menu
 */

'use strict';

/**
 * Display share menu
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function showShareMenu (app, data) {
	var share_path = [data.view, data.order, 'sharing'];
	app.modify(share_path, true);
	app.refresh();
};
