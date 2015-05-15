
/**
 * clear-opengraph-cache.js
 *
 * Purge opengrapch from cache
 */

module.exports = clearOpenGraphCache;

/**
 * Purge cache
 *
 * @param   Object  opts  Options { session, cache }
 * @return  Void
 */
function *clearOpenGraphCache(opts) {
	var session = opts.session;
	var cache = opts.cache;

	// find cache
	var hash = session.new_post_hash;
	if (!hash) {
		return;
	}

	// clear cache
	delete session.new_post_hash;
	yield cache.del('og:' + hash);
};
