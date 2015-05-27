
/**
 * club-leave.js
 *
 * Report club membership event
 */

module.exports = clubLeave;

/**
 * Send the user and club profile for reporting
 *
 * @param   Object  opts  { mixpanel, user, club, request }
 * @return  Void
 */
function clubLeave(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var club = opts.club;
	var request = opts.request;

	mixpanel.track('Club Leave', {
		distinct_id: user.uid
		, slug: club.slug
		, title: club.title
		, owner: club.owner
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.increment(
		user.uid
		, 'club_leave_count'
		, 1
	);

	mixpanel.people.increment(
		club.owner
		, 'total_member_count'
		, -1
	);
};
