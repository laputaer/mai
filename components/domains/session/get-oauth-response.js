
/**
 * get-oauth-response.js
 *
 * Retrieve oauth response from session
 */

module.exports = getOauthResponse;

/**
 * Get oauth response from session
 *
 * @param   Object  opts  Options { session }
 * @return  Object        Response
 */
function *getOauthResponse(opts) {
	var session = opts.session;

	if (!session.grant || !session.grant.response) {
		return;
	}

	return session.grant.response;
};
