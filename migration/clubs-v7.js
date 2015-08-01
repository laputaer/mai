
/**
 * clubs-v7.js
 *
 * Migration script for `clubs` collection, rev.7
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 7
		, name: 'clubs'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);

	yield Target.dropIndex({
		points: -1
	});

	yield Target.dropIndex({
		members: -1
	});

	yield Target.dropIndex({
		updated: -1
	});

	yield Target.dropIndex({
		owner: 1
	});

	yield Target.index({
		points: 1
		, members: 1
		, created: 1
		, updated: -1
	});

	yield Target.index({
		members: 1
		, points: -1
	});

	yield Target.index({
		points: 1
		, created: -1
	});

	// update revision
	yield updateRev(db, opts);
};
