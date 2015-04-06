
/**
 * users-v1.js
 *
 * Migration script for `users` collection, rev.1
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 1
		, name: 'users'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	yield Target.update({}, {
		action_point: 15
		, action_base: 15
	}, {
		multi: true
	});

	// update revision
	yield updateRev(db, opts);
};
