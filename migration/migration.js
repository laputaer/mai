
/**
 * migration.js
 *
 * Standalone script to migrate database schema
 */

var co = require('co');
var mongodb = require('../components/db/mongodb');
var configFactory = require('../components/config/config');

var usersV1 = require('./users-v1');
var usersV2 = require('./users-v2');
var usersV3 = require('./users-v3');

function *migration() {
	console.log('migration started');

	// prepare migration
	var context = {};
	context.config = configFactory();
	var db = yield mongodb.apply(context);

	// run migrations
	yield usersV1(db);
	yield usersV2(db);
	yield usersV3(db);
}

co(migration).then(function() {
	console.log('migration done');
	process.exit();
}).catch(function(err) {
	console.error(err.stack);
	process.exit();
});
