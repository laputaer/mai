
/**
 * clear-oauth-response.js
 *
 * Clear up any oauth response in session
 */

module.exports = clearOauthResponse;

/**
 * Remove oauth response from session
 *
 * @param   Object  opts  Options { session }
 * @return  Void
 */
function *clearOauthResponse(opts) {
	var session = opts.session;
	delete session.grant;
};
