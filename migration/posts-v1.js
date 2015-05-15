
/**
 * posts-v1.js
 *
 * Migration script for `posts` collection, rev.1
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 1
		, name: 'posts'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	yield Target.index({
		pid: 1
	}, {
		unique: true
	});
	yield Target.index({
		club: 1
		, created: -1
	}, {
		unique: true
	});
	yield Target.index({
		user: 1
		, created: -1
	}, {
		unique: true
	});
	yield Target.index({
		created: -1
	}, {
		unique: true
	});

	// update revision
	yield updateRev(db, opts);
};
