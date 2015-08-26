
/**
 * match-item.js
 *
 * Match stash item by user and url
 */

module.exports = matchItemUrl;

/**
 * Match stash item
 *
 * @param   Object  opts  Options { db, user, url }
 * @return  Object        Stash item
 */
function *matchItemUrl(opts) {
	var db = opts.db;
	var Stash = db.col('stash');

	return yield Stash.findOne({
		user: opts.user
		, url: opts.url
	});
};
