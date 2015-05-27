
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

	mixpanel.track('User Register', {
		distinct_id: user.uid
		, source: 'server'
		, ip: request.ip
	});
};