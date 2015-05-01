
/**
 * set-redirect.js
 *
 * Set a redirect path to be followed on login
 */

module.exports = setRedirect;

/**
 * Set a redirect for session user
 *
 * @param   Object  opts  Options { session, path }
 * @return  Void
 */
function *setRedirect(opts) {
	var session = opts.session;
	var ts = Date.now().toString();

	// cookie session
	session.redirect_path = opts.path;
	session.last_seen = ts;
};
