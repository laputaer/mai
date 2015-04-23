
/**
 * router.js
 *
 * Setup routing table
 */

var router = require('koa-router');

var landing = require('../handlers/landing');
var club = require('../handlers/club');
var clubNew = require('../handlers/club-new');
var clubCreate = require('../handlers/club-create');
var clubSearch = require('../handlers/club-search');
var clubHome = require('../handlers/club-home');
var clubJoin = require('../handlers/club-join');
var oauth = require('../handlers/oauth');
var profile = require('../handlers/user-profile');
var oauthFailure = require('../error-handler/oauth-error-handler');
var genericFailure = require('../error-handler/generic-error-handler');

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
	app.get('/club', club());
	app.get('/ranking', landing());
	app.get('/help', landing());

	app.get('/u/:uid', profile());
	app.get('/login/:provider', oauth());
	app.get('/login/:provider/failed', oauthFailure());
	app.get('/login/:provider/error', genericFailure());

	app.get('/club/add', clubNew());
	app.post('/club', clubCreate());
	app.get('/club/search', clubSearch());
	app.get('/c/:slug', clubHome());
	app.get('/c/:slug/join', clubJoin());
};
