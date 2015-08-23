
/**
 * user-register.js
 *
 * Report user register event
 */

module.exports = userRegister;

/**
 * Send the user profile for reporting
 *
 * @param   Object  opts  { mixpanel, user, request }
 * @return  Void
 */
function userRegister(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var request = opts.request;
	var now = new Date();

	mixpanel.track('User Register', {
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
		, last_action: now.toISOString()
		, last_user_register: now.toISOString()
		, ip: request.ip
	});
};
