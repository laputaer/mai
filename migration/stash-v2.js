
/**
 * stash-v2.js
 *
 * Migration script for `stash` collection, rev.2
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 2
		, name: 'stash'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);

	yield Target.dropIndex({
		user: 1
		, created: -1
	});

	yield Target.index({
		user: 1
		, deleted: 1
		, created: -1
	});

	yield Target.index({
		user: 1
		, url: 1
	});

	// update revision
	yield updateRev(db, opts);
};
