
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router')();
var handlers = require('./handlers/index');

var apiRouter = require('koa-router')();
var apiHandlers = require('./api/index');

module.exports = myRouter;

/**
 * Internal router
 *
 * @param   Object  app  Koa object
 * @return  Void
 */
function myRouter(app) {
	if (!app) {
		throw new Error('koa instance missing');
	}

	// standalone
	router.get('/', handlers.pageLanding());
	router.get('/help', handlers.pageHelp());
	router.get('/my-clubs', handlers.pageMyClubs());

	// user login
	router.get('/login/redirect', handlers.loginRedirect());
	router.get('/login/:provider', handlers.loginOauth());
	// /connect/ namespace is also used to do initial oauth

	// user profile
	router.get('/u/:uid', handlers.userProfile());

	// club management
	router.get('/c/club-home', handlers.clubsFilterUser());
	router.get('/c/club-ranking', handlers.clubsFilterRanking());
	router.get('/c/club-search', handlers.clubsFilterSearch());
	router.get('/c/club-add', handlers.clubAddForm());
	router.get('/c/:slug', handlers.club());
	router.get('/c/:slug/edit', handlers.clubEditForm());
	router.post('/c', handlers.clubCreate());
	router.post('/c/:slug', handlers.clubUpdate());
	router.post('/c/:slug/memberships', handlers.clubUserMembership());

	// club post
	router.get('/c/:slug/p/post-add', handlers.clubPostAddForm());
	router.get('/c/:slug/p/post-add-2', handlers.clubPostConfirmForm());
	router.post('/c/:slug/p/post-add', handlers.clubPostStart());
	router.post('/c/:slug/p/post-add-2', handlers.clubPostCreate());

	// api routes
	apiRouter.get('/global', apiHandlers.getGlobalConfig());
	apiRouter.get('/featured/clubs', apiHandlers.getFeaturedClubs());
	apiRouter.get('/featured/posts', apiHandlers.getFeaturedPosts());
	apiRouter.put('/posts/:pid/favorite', apiHandlers.favoritePost());
	apiRouter.del('/posts/:pid/favorite', apiHandlers.unfavoritePost());
	apiRouter.get('/clubs/owner', apiHandlers.userOwnedClubs());
	apiRouter.get('/clubs/member', apiHandlers.userJoinedClubs());
	apiRouter.get('/clubs/:slug/posts', apiHandlers.clubPosts());
	apiRouter.get('/clubs/:slug/profile', apiHandlers.clubProfile());

	// mount api routes to main router
	router.use('/api/v1', apiRouter.routes());

	// register router to koa app
	app.use(router.routes());
	app.use(router.allowedMethods());
};
