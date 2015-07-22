
/**
 * social-v1.js
 *
 * Migration script for `social` collection, rev.1
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 1
		, name: 'social'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);

	yield Target.index({
		post: 1
		, user: 1
	}, {
		unique: true
	});

	yield Target.index({
		post: 1
		, created: 1
	});

	yield Target.index({
		user: 1
		, created: -1
	});

	// update revision
	yield updateRev(db, opts);
};
