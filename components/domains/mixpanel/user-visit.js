
/**
 * user-visit.js
 *
 * Report existing user daily visit event
 */

module.exports = userVisit;

/**
 * Send the user profile for reporting
 *
 * @param   Object  opts  { mixpanel, user, request }
 * @return  Void
 */
function userVisit(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var request = opts.request;

	mixpanel.track('User Visit', {
		distinct_id: user.uid
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user.uid, {
		'$name': user.login
		, '$first_name': user.name
		, provider: user.provider
		, ip: request.ip
	});
};
