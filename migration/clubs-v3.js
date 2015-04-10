
/**
 * clubs-v3.js
 *
 * Migration script for `clubs` collection, rev.3
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 3
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
		title: 1
		, created: 1
	});
	yield Target.index({
		slug: 1
		, created: 1
	});

	// update revision
	yield updateRev(db, opts);
};
