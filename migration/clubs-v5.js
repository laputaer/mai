
/**
 * clubs-v5.js
 *
 * Migration script for `clubs` collection, rev.5
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 5
		, name: 'clubs'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	yield Target.index({
		created: -1
	});
	yield Target.index({
		updated: -1
	});
	yield Target.index({
		members: -1
	});

	// update revision
	yield updateRev(db, opts);
};
