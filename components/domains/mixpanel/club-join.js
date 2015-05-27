
/**
 * club-join.js
 *
 * Report club membership event
 */

module.exports = clubJoin;

/**
 * Send the user and club profile for reporting
 *
 * @param   Object  opts  { mixpanel, user, club, request }
 * @return  Void
 */
function clubJoin(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var club = opts.club;
	var request = opts.request;

	mixpanel.track('Club Join', {
		distinct_id: user.uid
		, slug: club.slug
		, title: club.title
		, owner: club.owner
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.increment(
		user.uid
		, 'club_join_count'
		, 1
	);

	mixpanel.people.increment(
		club.owner
		, 'total_member_count'
		, 1
	);
};
