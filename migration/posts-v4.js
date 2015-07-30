
/**
 * posts-v4.js
 *
 * Migration script for `posts` collection, rev.4
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 4
		, name: 'posts'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);

	yield Target.update({}, {
		fav_point: 0
	}, {
		multi: true
	});

	// update revision
	yield updateRev(db, opts);
};
