
/**
 * users-v3.js
 *
 * Migration script for `users` collection, rev.3
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 3
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
		'$rename': {
			'timestamp': 'created'
		}
	}, {
		multi: true
	});

	yield Target.update({}, {
		updated: new Date()
	}, {
		multi: true
	});

	// update revision
	yield updateRev(db, opts);
};
