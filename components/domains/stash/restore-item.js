
/**
 * restore-item.js
 *
 * Restore a stash item given sid
 */

module.exports = restoreItem;

/**
 * Restore an item
 *
 * @param   Object  opts  Options { db, sid, uid }
 * @return  Void
 */
function *restoreItem(opts) {
	var db = opts.db;
	var sid = opts.sid;
	var uid = opts.uid;
	var User = db.col('users');
	var Stash = db.col('stash');

	// STEP 1: update user stash count
	yield User.update({
		uid: uid
	}, {
		$inc: {
			stash_count: 1
		}
	});

	// STEP 2: update item delete flag
	yield Stash.update({
		sid: sid
	}, {
		deleted: false
		, updated: new Date()
	});
};
