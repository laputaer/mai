
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');

var landing = require('../landing/landing');

module.exports = myRouter;

/**
 * Internal router
 *
 * @param   Object  app  Koa object
 * @return  MW
 */
function myRouter(app) {
	if (!app) {
		return;
	}

	app.use(router(app));

	app.get('/', landing());
};
