
/**
 * get-user-items.js
 *
 * Find stash items related to a user
 */

module.exports = getUserItems;

/**
 * Find items by user id
 *
 * @param   Object  opts  Options { db, uid, limit, range, active }
 * @return  Array         A list of items
 */
function *getUserItems(opts) {
	var db = opts.db;
	var uid = opts.uid;
	var limit = opts.limit;
	var range = opts.range;
	var active = opts.active;

	var Stash = db.col('stash');

	var query = {
		user: uid
	};

	if (range > 0) {
		query.created = {
			'$lt': new Date(range)
		};
	}

	if (active) {
		query.deleted = {
			'$ne': true
		};
	}

	// STEP 1: find items
	var items = yield Stash.find(query).sort({ created: -1 }).limit(limit);

	return items ? items : [];
};
