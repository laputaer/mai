
/**
 * get-redirect.js (deprecated)
 *
 * Get stored redirect after login is done
 */

module.exports = getRedirect;

/**
 * Get stored redirect path and clear it
 *
 * @param   Object  opts  Options { session }
 * @return  String        Redirect path
 */
function *getRedirect(opts) {
	var session = opts.session;

	// cookie session
	var path = session.redirect_path;
	delete session.redirect_path;

	// session too old, ignore
	if (parseInt(session.last_seen, 10) < Date.now() - 1000 * 60 * 5) {
		return null;
	}

	return path;
};
