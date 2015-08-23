
/**
 * post-create.js
 *
 * Report club post event
 */

module.exports = postCreate;

/**
 * Send the post for reporting
 *
 * @param   Object  opts  { mixpanel, club, user, embed, body, request }
 * @return  Void
 */
function postCreate(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var club = opts.club;
	var embed = opts.embed;
	var body = opts.body;
	var request = opts.request;
	var now = new Date();

	mixpanel.track('Post Create', {
		distinct_id: user.uid
		, user: user.uid
		, club: club.slug
		, title: body.title
		, summary: body.summary
		, embed_url: embed.url
		, embed_title: embed.title
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user.uid, {
		last_action: now.toISOString()
		, last_post_create: now.toISOString()
		, ip: request.ip
	});

	mixpanel.people.increment(
		user.uid
		, 'post_create_count'
		, 1
	);
};
