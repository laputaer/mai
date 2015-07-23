
/**
 * get-featured-ids.js
 *
 * Get features given type
 */

module.exports = getFeaturedIds;

/**
 * Get posts given pids
 *
 * @param   Object  opts  Options { db, type }
 * @return  Array         A list of features
 */
function *getFeaturedIds(opts) {
	var db = opts.db;
	var type = opts.type;
	var Showcase = db.col('showcase');

	var features = yield Showcase.findOne({
		type: type
	});

	if (!features) {
		return [];
	}

	return features.list;
};
