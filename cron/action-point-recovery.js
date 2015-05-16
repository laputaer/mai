
/**
 * action-pointer-recovery.js
 *
 * Standalone script to recover all users' action points
 */

var co = require('co');
var mongodb = require('../components/db/mongodb');
var configFactory = require('../components/config/config');

function *migration() {
	console.log('cron started');

	// prepare database connection
	var config = configFactory();
	var db = yield mongodb(config.mongodb);

	var User = db.col('users');

	// get all users
	var users = yield User.find().select({
		action_point: 1
		, action_base: 1
		, uid: 1
		, _id: 0
	});

	// update user ap
	var counter = 0;
	for (var i = 0; i < users.length; i++) {
		var user = users[i];
		if (user.action_point < user.action_base) {
			yield User.update({
				uid: user.uid
			}, {
				action_point: user.action_base
			});
			counter++;
		}
	}

	console.log('found ' + users.length + ' users');
	console.log('updated ' + counter + ' users');
};

co(migration).then(function() {
	console.log('cron done');
	process.exit();
}).catch(function(err) {
	console.error(err.stack);
	process.exit();
});
