
/**
 * user-login.js
 *
 * Report user login event
 */

module.exports = userLogin;

/**
 * Send the user profile for reporting
 *
 * @param   Object  opts  { mixpanel, user, request }
 * @return  Void
 */
function userLogin(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var request = opts.request;

	mixpanel.track('User Login', {
		distinct_id: user.uid
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user.uid, {
		'$name': user.login
		, '$first_name': user.name
		, '$created': user.created.toISOString()
		, updated: user.updated.toISOString()
		, provider: user.provider
		, action_base: user.action_base
		, ip: request.ip
	});
};
