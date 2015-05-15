
/**
 * set-post-link.js
 *
 * Set a post link for oembed extraction
 */

module.exports = setPostLink;

/**
 * Set post link for session user
 *
 * @param   Object  opts  Options { session, link }
 * @return  Void
 */
function *setPostLink(opts) {
	var session = opts.session;
	var ts = Date.now().toString();

	// cookie session
	session.post_link = opts.link;
	session.last_seen = ts;
};
