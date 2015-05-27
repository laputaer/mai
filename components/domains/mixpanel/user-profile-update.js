
/**
 * user-profile-update.js
 *
 * Record user profile
 */

module.exports = userProfileUpdate;

/**
 * Send the user profile for reporting
 *
 * @param   Object  opts  { mixpanel, user, request }
 * @return  Void
 */
function userProfileUpdate(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var request = opts.request;

	mixpanel.people.set(user.uid, {
		'$name': user.login
		, '$first_name': user.name
		, '$created': user.created.toISOString()
		, updated: user.updated.toISOString()
		, provider: user.provider
		, action_point: user.action_point
		, action_base: user.action_base
		, ip: request.ip
	});
};
