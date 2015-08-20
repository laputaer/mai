
/**
 * delete-item.js
 *
 * Remove a stash item given sid
 */

module.exports = deleteItem;

/**
 * Remove an item from stash
 *
 * @param   Object  opts  Options { db, sid, uid }
 * @return  Void
 */
function *deleteItem(opts) {
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
			stash_count: -1
		}
	});

	// STEP 2: remove item
	yield Stash.remove({
		sid: sid
	});
};
