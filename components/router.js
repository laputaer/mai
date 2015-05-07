
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');

var landing = require('./handlers/landing');
var club = require('./handlers/club');
var clubAdd = require('./handlers/club-add');
var clubCreate = require('./handlers/club-create');
var clubSearch = require('./handlers/club-search');
var clubHome = require('./handlers/club-home');
var clubMembership = require('./handlers/club-membership');
var clubEdit = require('./handlers/club-edit');
var clubUpdate = require('./handlers/club-update');
var oauth = require('./handlers/oauth');
var profile = require('./handlers/user-profile');
var oauthFailure = require('./handlers/oauth-error-handler');
var loginRedirect = require('./handlers/login-redirect');

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
	app.get('/c', club());
	app.get('/ranking', landing());
	app.get('/help', landing());

	app.get('/login/redirect', loginRedirect());

	app.get('/u/:uid', profile());
	app.get('/login/:provider', oauth());
	app.get('/login/:provider/failed', oauthFailure());

	app.get('/c/add', clubAdd());
	app.get('/c/search', clubSearch());
	app.post('/c', clubCreate());

	app.get('/c/:slug', clubHome());
	app.get('/c/:slug/edit', clubEdit());
	app.post('/c/:slug', clubUpdate());
	app.post('/c/:slug/memberships', clubMembership());
};
