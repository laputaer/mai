
/**
 * get-favorite-posts-by-ids.js
 *
 * Get favorte posts given pids and uids, return result using order specified
 */

module.exports = getFavoritePostsByIds;

/**
 * Get favorte posts
 *
 * @param   Object  opts  Options { db, favs }
 * @return  Object        Keyed output
 */
function *getFavoritePostsByIds(opts) {
	var db = opts.db;
	var favs = opts.favs;
	var Social = db.col('social');

	var favs = yield Social.find().or(favs);
	var output = {};

	favs.forEach(function (fav) {
		output[fav.post] = fav;
	});

	return output;
};
