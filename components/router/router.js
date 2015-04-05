
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');

var landing = require('../landing/landing');
var user = require('../user/user');
var profile = require('../user/user-profile');
var oauthFailure = require('../error-handler/oauth-error-handler');
var genericFailure = require('../error-handler/generic-error-handler');
//var club = require('../club/club');

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
	app.get('/my', landing());
	app.get('/ranking', landing());
	app.get('/help', landing());

	app.get('/u/:pid', profile());
	app.get('/login/:provider', user());
	app.get('/login/:provider/failed', oauthFailure());
	app.get('/login/:provider/error', genericFailure());

	//app.get('/club/add', club.add());
	//app.post('/club', club.create());
};
