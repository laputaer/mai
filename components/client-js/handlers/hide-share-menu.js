
/**
 * hide-share-menu.js
 *
 * Hide share menu
 */

'use strict';

/**
 * Hide share menu
 *
 * @oaram   Object  app   App instance
 * @oaram   Object  data  Event data
 * @return  Void
 */
module.exports = function hideShareMenu (app, data) {
	var share_path = [data.view, data.order, 'sharing'];
	app.modify(share_path, false);
	app.refresh();
};
