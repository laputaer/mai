
/**
 * posts-v1.js
 *
 * Migration script for `posts` collection, rev.3
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 3
		, name: 'posts'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);

	// remove incorrect unique flag on these indexes
	yield Target.dropIndex({
		club: 1
		, created: -1
	});

	yield Target.dropIndex({
		user: 1
		, created: -1
	});

	yield Target.dropIndex({
		created: -1
	});

	// re-index properly
	yield Target.index({
		club: 1
		, created: -1
	});

	yield Target.index({
		user: 1
		, created: -1
	});

	yield Target.index({
		created: -1
	});

	// update revision
	yield updateRev(db, opts);
};
