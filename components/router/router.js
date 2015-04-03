
/**
 * router.js
 *
 * Setup routing table
 */

var r = require('koa-route');

var landing = require('../landing/landing');
var user = require('../user/user');
var homePath = require('../home/home');

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

	app.use(r.get('/', landing()));
	app.use(r.get('/home', homePath()));
	app.use(r.get('/login/:provider', user()));
};
