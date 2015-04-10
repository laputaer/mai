
/**
 * migration.js
 *
 * Standalone script to migrate database schema
 */

var co = require('co');
var mongodb = require('../components/db/mongodb');
var configFactory = require('../components/config/config');

var versionsV1 = require('./versions-v1');
var usersV1 = require('./users-v1');
var usersV2 = require('./users-v2');
var usersV3 = require('./users-v3');
var clubsV1 = require('./clubs-v1');
var clubsV2 = require('./clubs-v2');
var clubsV3 = require('./clubs-v3');
var membershipsV1 = require('./memberships-v1');

function *migration() {
	console.log('migration started');

	// prepare migration
	var context = {};
	context.config = configFactory();
	var db = yield mongodb.apply(context);

	// run migrations, always add new migration at the end
	yield versionsV1(db);
	yield usersV1(db);
	yield usersV2(db);
	yield usersV3(db);
	yield clubsV1(db);
	yield clubsV2(db);
	yield clubsV3(db);
	yield membershipsV1(db);
}

co(migration).then(function() {
	console.log('migration done');
	process.exit();
}).catch(function(err) {
	console.error(err.stack);
	process.exit();
});
