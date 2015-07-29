
/**
 * memberships-v3.js
 *
 * Migration script for `memberships` collection, rev.3
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 3
		, name: 'memberships'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	var Club = db.col('clubs');

	var memberships = yield Target.find().select({
		uid: 1
		, slug: 1
		, _id: 0
	});

	for (var i = 0; i < memberships.length; i++) {
		var member = memberships[i];

		var owner = yield Club.findOne({
			slug: member.slug
			, owner: member.uid
		});

		if (owner) {
			yield Target.update(member, {
				type: 'owner'
			});
		} else {
			yield Target.update(member, {
				type: 'member'
			});
		}
	}

	yield Target.dropIndex({
		uid: 1
		, created: -1
	});

	yield Target.dropIndex({
		slug: 1
		, created: -1
	});

	yield Target.index({
		uid: 1
		, type: 1
		, created: -1
	});

	yield Target.index({
		slug: 1
		, type: 1
		, created: -1
	});

	// update revision
	yield updateRev(db, opts);
};
