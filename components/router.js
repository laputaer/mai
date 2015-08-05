
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

	// main pages
	router.get('/', handlers.pageLanding());
	router.get('/my-clubs', handlers.pageMyClubs());
	router.get('/ranking', handlers.pageRanking());
	router.get('/help', handlers.pageHelp());

	// user login
	// /connect/ namespace is used to start oauth
	router.get('/login/:provider', handlers.pageLogin());

	// user profile
	router.get('/u/:uid', handlers.pageUserProfile());

	// club profile
	router.get('/c/:slug', handlers.pageClubProfile());

	/*
	// old stuffs, for reference
	router.get('/c/club-search', handlers.clubsFilterSearch());
	router.get('/c/club-add', handlers.clubAddForm());
	router.get('/c/:slug/edit', handlers.clubEditForm());
	router.post('/c', handlers.clubCreate());
	router.post('/c/:slug', handlers.clubUpdate());
	router.post('/c/:slug/memberships', handlers.clubUserMembership());

	router.get('/c/:slug/p/post-add', handlers.clubPostAddForm());
	router.get('/c/:slug/p/post-add-2', handlers.clubPostConfirmForm());
	router.post('/c/:slug/p/post-add', handlers.clubPostStart());
	router.post('/c/:slug/p/post-add-2', handlers.clubPostCreate());
	*/

	// api routes
	apiRouter.get('/global', apiHandlers.globalConfig());
	apiRouter.get('/clubs/featured', apiHandlers.featuredClubs());
	apiRouter.get('/posts/featured', apiHandlers.featuredPosts());
	apiRouter.put('/posts/:pid/favorite', apiHandlers.favoritePost());
	apiRouter.del('/posts/:pid/favorite', apiHandlers.unfavoritePost());
	apiRouter.get('/clubs/owner', apiHandlers.userOwnedClubs());
	apiRouter.get('/clubs/member', apiHandlers.userJoinedClubs());
	apiRouter.get('/clubs/:slug/posts', apiHandlers.clubPosts());
	apiRouter.get('/clubs/:slug/profile', apiHandlers.clubProfile());
	apiRouter.get('/users/:uid/posts', apiHandlers.userPosts());
	apiRouter.get('/users/:uid/profile', apiHandlers.userProfile());
	apiRouter.get('/clubs/top', apiHandlers.topClubs());
	apiRouter.get('/clubs/hot', apiHandlers.hotClubs());
	apiRouter.get('/clubs/recent', apiHandlers.recentClubs());
	apiRouter.post('/clubs', apiHandlers.createClub());
	apiRouter.put('/clubs/:slug', apiHandlers.manageClub());

	// mount api routes to main router
	router.use('/api/v1', apiRouter.routes());

	// register router to koa app
	app.use(router.routes());
	app.use(router.allowedMethods());
};
