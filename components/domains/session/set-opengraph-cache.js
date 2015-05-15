
/**
 * set-opengraph-cache.js
 *
 * Set opengrapch in cache and session
 */

var cuid = require('cuid');

module.exports = setOpenGraphCache;

/**
 * Set cache
 *
 * @param   Object  opts  Options { cache, session, og }
 * @return  Void
 */
function *setOpenGraphCache(opts) {
	var session = opts.session;
	var cache = opts.cache;
	var og = JSON.stringify(opts.og);
	var hash = cuid();
	var ts = Date.now().toString();

	// guest session, ignore
	if (!session.uid) {
		return false;
	}

	// cookie session
	session.new_post_hash = hash;
	session.last_seen = ts;

	// cache update
	yield cache.set('og:' + hash, og);
	yield cache.expire('og:' + hash, 60 * 15);
};
