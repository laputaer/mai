
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

	// standalone
	app.get('/', handlers.pageLanding());
	app.get('/help', handlers.pageHelp());

	// user login
	app.get('/login/redirect', handlers.loginRedirect());
	app.get('/login/:provider', handlers.loginOauth());
	// /connect/ namespace is also used to do initial oauth

	// user profile
	app.get('/u/:uid', handlers.userProfile());

	// club management
	app.get('/c/club-home', handlers.clubsFilterUser());
	app.get('/c/club-ranking', handlers.clubsFilterRanking());
	app.get('/c/club-search', handlers.clubsFilterSearch());
	app.get('/c/club-add', handlers.clubAddForm());
	app.get('/c/:slug', handlers.club());
	app.get('/c/:slug/edit', handlers.clubEditForm());
	app.post('/c', handlers.clubCreate());
	app.post('/c/:slug', handlers.clubUpdate());
	app.post('/c/:slug/memberships', handlers.clubUserMembership());

	// club post
	app.get('/c/:slug/p', handlers.clubPosts());
	app.get('/c/:slug/p/post-add', handlers.clubPostAddForm());
	app.get('/c/:slug/p/post-add-2', handlers.clubPostConfirmForm());
	app.get('/c/:slug/p/:pid', handlers.clubPost());
	app.get('/c/:slug/p/:pid/edit', handlers.clubPostEditForm());
	app.post('/c/:slug/p/post-add', handlers.clubPostStart());
	app.post('/c/:slug/p/post-add-2', handlers.clubPostCreate());
	app.post('/c/:slug/p/:pid', handlers.clubPostUpdate());
};
