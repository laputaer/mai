
/**
 * clubs-v1.js
 *
 * Migration script for `clubs` collection, rev.1
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 1
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
		slug: 1
	}, {
		unique: true
	});

	// update revision
	yield updateRev(db, opts);
};
