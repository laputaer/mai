
/**
 * migration.js
 *
 * Standalone script to migrate database schema
 */

var co = require('co');
var mongodb = require('../components/db/mongodb');
var redis = require('../components/db/redis');
var configFactory = require('../components/config/config');

var versionsV1 = require('./versions-v1');
var usersV1 = require('./users-v1');
var usersV2 = require('./users-v2');
var usersV3 = require('./users-v3');
var usersV4 = require('./users-v4');
var clubsV1 = require('./clubs-v1');
var clubsV2 = require('./clubs-v2');
var clubsV3 = require('./clubs-v3');
var clubsV4 = require('./clubs-v4');
var clubsV5 = require('./clubs-v5');
var clubsV6 = require('./clubs-v6');
var clubsV7 = require('./clubs-v7');
var membershipsV1 = require('./memberships-v1');
var membershipsV2 = require('./memberships-v2');
var membershipsV3 = require('./memberships-v3');
var cacheUsersV1 = require('./cache-users-v1');
var postsV1 = require('./posts-v1');
var postsV2 = require('./posts-v2');
var postsV3 = require('./posts-v3');
var postsV4 = require('./posts-v4');
var socialV1 = require('./social-v1');
var socialV2 = require('./social-v2');
var showcaseV1 = require('./showcase-v1');
var stashV1 = require('./stash-v1');
var appsV1 = require('./apps-v1');

function *migration() {
	console.log('migration started');

	// prepare migration
	var config = configFactory();
	var db = yield mongodb(config.mongodb);
	var cache = yield redis(config.redis);

	// run migrations, always add new migration at the end
	yield versionsV1(db);
	yield usersV1(db);
	yield usersV2(db);
	yield usersV3(db);
	yield clubsV1(db);
	yield clubsV2(db);
	yield clubsV3(db);
	yield membershipsV1(db);
	yield cacheUsersV1(db, cache, config);
	yield postsV1(db);
	yield postsV2(db);
	yield clubsV4(db);
	yield clubsV5(db);
	yield clubsV6(db);
	yield postsV3(db);
	yield membershipsV2(db);
	yield socialV1(db);
	yield showcaseV1(db);
	yield membershipsV3(db);
	yield postsV4(db);
	yield socialV2(db);
	yield usersV4(db);
	yield clubsV7(db);
	yield stashV1(db);
	yield appsV1(db);
};

co(migration).then(function() {
	console.log('migration done');
	process.exit();
}).catch(function(err) {
	console.error(err.stack);
	process.exit();
});
