
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
	apiRouter.post('/clubs/:slug/posts', apiHandlers.initPost());
	apiRouter.post('/clubs/:slug/posts/create', apiHandlers.createPost());
	apiRouter.put('/clubs/:slug/users', apiHandlers.joinClub());
	apiRouter.del('/clubs/:slug/users', apiHandlers.leaveClub());
	apiRouter.get('/posts/recent', apiHandlers.recentPosts());
	apiRouter.post('/stash', apiHandlers.createStashItem());
	apiRouter.del('/stash/:sid', apiHandlers.deleteStashItem());
	apiRouter.get('/stash', apiHandlers.userStashItems());
	apiRouter.post('/stash/extension', apiHandlers.createStashItemExtension());

	// app tokens
	apiRouter.get('/apps', apiHandlers.userApps());
	apiRouter.post('/apps', apiHandlers.generateAppPassword());
	apiRouter.del('/apps/:aid', apiHandlers.deleteAppPassword());
	apiRouter.put('/apps/:aid', apiHandlers.restoreAppPassword());

	// mount api routes to main router
	router.use('/api/v1', apiRouter.routes());

	// register router to koa app
	app.use(router.routes());
	app.use(router.allowedMethods());
};
