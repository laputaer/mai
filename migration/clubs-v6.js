
/**
 * clubs-v6.js
 *
 * Migration script for `clubs` collection, rev.6
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 6
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
		points: -1
	});

	// update revision
	yield updateRev(db, opts);
};
