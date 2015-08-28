
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router')();
var handlers = require('./handlers/index');

var apiRouter = require('koa-router')();
var webRouter = require('koa-router')();
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
	webRouter.get('/global', apiHandlers.globalConfig());

	// club profile
	webRouter.get('/clubs/:slug/posts', apiHandlers.clubPosts());
	webRouter.get('/clubs/:slug/profile', apiHandlers.clubProfile());

	// club list
	webRouter.get('/clubs/featured', apiHandlers.featuredClubs());
	webRouter.get('/clubs/owner', apiHandlers.userOwnedClubs());
	webRouter.get('/clubs/member', apiHandlers.userJoinedClubs());
	webRouter.get('/clubs/top', apiHandlers.topClubs());
	webRouter.get('/clubs/hot', apiHandlers.hotClubs());
	webRouter.get('/clubs/recent', apiHandlers.recentClubs());
	webRouter.get('/clubs/user', apiHandlers.userClubs());

	// club management
	webRouter.post('/clubs', apiHandlers.createClub());
	webRouter.post('/clubs/:slug', apiHandlers.manageClub());
	webRouter.post('/clubs/:slug/posts', apiHandlers.initPost());
	webRouter.post('/clubs/:slug/posts/create', apiHandlers.createPost());
	webRouter.put('/clubs/:slug/users', apiHandlers.joinClub());
	webRouter.del('/clubs/:slug/users', apiHandlers.leaveClub());

	// user profile
	webRouter.get('/users/:uid/posts', apiHandlers.userPosts());
	webRouter.get('/users/:uid/profile', apiHandlers.userProfile());

	// post list
	webRouter.get('/posts/featured', apiHandlers.featuredPosts());
	webRouter.get('/posts/recent', apiHandlers.recentPosts());

	// post action
	webRouter.put('/posts/:pid/favorite', apiHandlers.favoritePost());
	webRouter.del('/posts/:pid/favorite', apiHandlers.unfavoritePost());

	// user stash
	webRouter.get('/stash', apiHandlers.userStashItems());
	webRouter.get('/stash/:sid', apiHandlers.userStashItem());
	webRouter.post('/stash', apiHandlers.createStashItem());
	webRouter.del('/stash/:sid', apiHandlers.deleteStashItem());
	webRouter.put('/stash/:sid', apiHandlers.restoreStashItem());

	// app tokens
	webRouter.get('/apps', apiHandlers.userApps());
	webRouter.post('/apps', apiHandlers.createAppPassword());
	webRouter.del('/apps/:aid', apiHandlers.deleteAppPassword());
	webRouter.put('/apps/:aid', apiHandlers.restoreAppPassword());

	// extension api
	apiRouter.post('/refresh', apiHandlers.appTokenRefresh());
	apiRouter.post('/stash', apiHandlers.appCreateStashItem());

	// mount api routes to main router
	router.use('/web/v1', webRouter.routes());
	router.use('/api/v1', apiRouter.routes());

	// register router to koa app
	app.use(router.routes());
	app.use(router.allowedMethods());
};
