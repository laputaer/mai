
/**
 * club-create.js
 *
 * Report club creation event
 */

module.exports = clubCreate;

/**
 * Send the user and club profile for reporting
 *
 * @param   Object  opts  { mixpanel, club, request }
 * @return  Void
 */
function clubCreate(opts) {
	var mixpanel = opts.mixpanel;
	var club = opts.club;
	var request = opts.request;
	var now = new Date();

	mixpanel.track('Club Create', {
		distinct_id: club.owner
		, slug: club.slug
		, title: club.title
		, owner: club.owner
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(club.owner, {
		last_action: now.toISOString()
		, last_club_create: now.toISOString()
		, ip: request.ip
	});

	mixpanel.people.increment(
		club.owner
		, 'club_create_count'
		, 1
	);
};
