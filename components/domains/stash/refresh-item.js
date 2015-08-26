
/**
 * refresh-item.js
 *
 * Restore a deleted item, modify its creation time
 */

module.exports = refreshItem;

/**
 * Restore an item, modify create date
 *
 * @param   Object  opts  Options { db, sid, uid }
 * @return  Object
 */
function *refreshItem(opts) {
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
		, created: new Date()
		, updated: new Date()
	});

	// STEP 3: get the item
	return yield Stash.findOne({
		sid: sid
	});
};
