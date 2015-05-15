
/**
 * get-post-link.js
 *
 * Get post link from user session
 */

module.exports = getPostLink;

/**
 * Get post link and clear it
 *
 * @param   Object  opts  Options { session }
 * @return  String        Post link
 */
function *getRedirect(opts) {
	var session = opts.session;

	// cookie session
	var link = session.post_link;
	delete session.post_link;

	// session too old, ignore
	if (parseInt(session.last_seen, 10) < Date.now() - 1000 * 60 * 5) {
		return;
	}

	return link;
};
