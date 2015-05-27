
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

	mixpanel.track('Club Create', {
		distinct_id: club.owner
		, slug: club.slug
		, title: club.title
		, source: 'server'
		, ip: request.ip
	});
};
