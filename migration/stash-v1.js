
/**
 * stash-v1.js
 *
 * Migration script for `stash` collection, rev.1
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 1
		, name: 'stash'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	yield Target.index({
		sid: 1
	}, {
		unique: true
	});

	yield Target.index({
		user: 1
		, created: -1
	});

	// update revision
	yield updateRev(db, opts);
};
