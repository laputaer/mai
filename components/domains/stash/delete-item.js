
/**
 * delete-item.js
 *
 * Remove a stash item given sid
 */

module.exports = deleteItem;

/**
 * Remove an item from stash
 *
 * @param   Object  opts  Options { db, sid }
 * @return  Void
 */
function *deleteItem(opts) {
	var db = opts.db;
	var sid = opts.sid;
	var Stash = db.col('stash');

	// STEP 1: remove item
	yield Stash.remove({
		sid: sid
	});
};
