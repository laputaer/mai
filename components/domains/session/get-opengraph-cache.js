
/**
 * get-opengraph-cache.js
 *
 * Set opengrapch from cache
 */

module.exports = getOpenGraphCache;

/**
 * Get cache
 *
 * @param   Object  opts  Options { session, cache }
 * @return  Object        Opengraph object
 */
function *getOpenGraphCache(opts) {
	var session = opts.session;
	var cache = opts.cache;

	// guest session, ignore
	if (!session.uid) {
		return false;
	}

	// cookie session
	var hash = session.new_post_hash;

	// get cache
	var embed = yield cache.get('embed:' + hash);

	return JSON.parse(embed);
};
