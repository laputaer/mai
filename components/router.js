
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');
var handlers = require('./handlers/index');

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

	app.get('/', handlers.landing());
	app.get('/c', handlers.club());
	app.get('/ranking', handlers.landing());
	app.get('/help', handlers.landing());

	app.get('/login/redirect', handlers.loginRedirect());

	app.get('/u/:uid', handlers.userProfile());
	app.get('/login/:provider', handlers.oauth());

	app.get('/c/add', handlers.clubAdd());
	app.get('/c/search', handlers.clubSearch());
	app.post('/c', handlers.clubCreate());

	app.get('/c/:slug', handlers.clubHome());
	app.get('/c/:slug/edit', handlers.clubEdit());
	app.post('/c/:slug', handlers.clubUpdate());
	app.post('/c/:slug/memberships', handlers.clubMembership());
};
