
/**
 * update-revision.js
 *
 * Update revision when migration is done
 */

module.exports = update;

/**
 * Update revision
 *
 * @param   Object  db    Mongodb instance
 * @param   Object  opts  Custom queries
 * @return  Void
 */
function *update(db, opts) {
	if (!db || !opts) {
		throw new Error('Unable to update revision');
	}

	var Version = db.col('versions');

	yield Version.update({}, {
		timestamp: new Date()
		, revision: opts.revision
		, collection: opts.name
	}, {
		upsert: true
	});

	console.log(opts.name + ' collection migration done, at revision ' + opts.revision);
};
