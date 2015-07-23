
/**
 * showcase-v1.js
 *
 * Migration script for `showcase` collection, rev.1
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 1
		, name: 'showcase'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);

	yield Target.index({
		type: 1
	}, {
		unique: true
	});

	yield Target.insert({
		type: 'featured-club-ids'
		, list: []
		, limit: 10
	});

	yield Target.insert({
		type: 'featured-post-ids'
		, list: []
		, limit: 100
	});

	// update revision
	yield updateRev(db, opts);
};
