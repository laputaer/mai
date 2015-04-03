
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');

var landing = require('../landing/landing');
var user = require('../user/user');
var home = require('../home/home');
var ranking = require('../ranking/ranking');
var help = require('../help/help');
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
	app.get('/home', home());
	app.get('/ranking', ranking());
	app.get('/help', help());
	app.get('/login/:provider', user());

	//app.get('/club/add', club.add());
	//app.post('/club', club.create());
};
