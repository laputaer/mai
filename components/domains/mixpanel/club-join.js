
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
	var now = new Date();

	mixpanel.track('Club Join', {
		distinct_id: user.uid
		, slug: club.slug
		, title: club.title
		, owner: club.owner
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user.uid, {
		last_action: now.toISOString()
		, last_club_join: now.toISOString()
		, ip: request.ip
	});

	mixpanel.people.increment(
		user.uid
		, 'club_join_count'
		, 1
	);
};
