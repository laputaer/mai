
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');

var landing = require('../landing/landing');
var my = require('../my/my');
var oauthFailure = require('../error-handler/oauth-error-handler');
var ranking = require('../ranking/ranking');
var help = require('../help/help');

var user = require('../user/user');
var club = require('../club/club');

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
	app.get('/my', my());
	app.get('/login/:provider', user());
	app.get('/login/:provider/failed', oauthFailure());

	app.get('/ranking', landing());
	app.get('/help', landing());

	app.get('/club/add', club.add());
	app.post('/club', club.create());
};
