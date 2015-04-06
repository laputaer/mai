
/**
 * check-revision.js
 *
 * Make sure current revision is older than target revision
 */

module.exports = check;

/**
 * Check revision
 *
 * @param   Object   db    Mongodb instance
 * @param   Object   opts  Custom queries
 * @return  Boolean
 */
function *check(db, opts) {
	if (!db || !opts) {
		throw new Error('Unable to check revision');
	}

	var Version = db.col('versions');

	var current = yield Version.findOne({
		collection: opts.name
	});

	if (current && current.revision >= opts.revision) {
		console.log(opts.name + ' collection already migrated, at revision ' + current.revision);
		return false;
	}

	return true;
};
