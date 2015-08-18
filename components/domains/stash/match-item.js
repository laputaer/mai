
/**
 * match-item.js
 *
 * Match stash item by sid
 */

module.exports = matchItem;

/**
 * Match stash item
 *
 * @param   Object  opts  Options { db, sid }
 * @return  Object        Stash item
 */
function *matchItem(opts) {
	var db = opts.db;
	var Stash = db.col('stash');

	return yield Stash.findOne({
		sid: opts.sid
	});
};
