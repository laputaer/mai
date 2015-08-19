
/**
 * app-connect.js
 *
 * Report app password event
 */

module.exports = appConnect;

/**
 * Send the event for reporting
 *
 * @param   Object  opts  { mixpanel, user, request }
 * @return  Void
 */
function appConnect(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var request = opts.request;
	var now = new Date();

	mixpanel.track('App connect', {
		distinct_id: user
		, user: user
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user, {
		last_action: now.toISOString()
		, last_app_connect: now.toISOString()
		, ip: request.ip
	});

	mixpanel.people.increment(
		user
		, 'app_connect_count'
		, 1
	);
};
