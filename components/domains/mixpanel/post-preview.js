
/**
 * post-preview.js
 *
 * Report club post event
 */

module.exports = postPreview;

/**
 * Send the post for reporting
 *
 * @param   Object  opts  { mixpanel, club, user, embed, request }
 * @return  Void
 */
function postPreview(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var club = opts.club;
	var embed = opts.embed;
	var request = opts.request;

	mixpanel.track('Post Preview', {
		distinct_id: user.uid
		, user: user.uid
		, club: club.slug
		, embed_url: embed.url
		, embed_title: embed.title
		, embed_type: embed.type
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.increment(
		user.uid
		, 'post_preview_count'
		, 1
	);
};
