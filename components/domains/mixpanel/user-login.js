
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
	var now = new Date();

	mixpanel.track('User Login', {
		distinct_id: user.uid
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user.uid, {
		'$name': user.login
		, '$first_name': user.name
		, updated: user.updated.toISOString()
		, provider: user.provider
		, last_action: now.toISOString()
		, last_user_login: now.toISOString()
		, ip: request.ip
	});
};
