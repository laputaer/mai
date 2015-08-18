
/**
 * post-favorite.js
 *
 * Report club post favorite event
 */

module.exports = postFavorite;

/**
 * Send the post for reporting
 *
 * @param   Object  opts  { mixpanel, user, post, request }
 * @return  Void
 */
function postFavorite(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var post = opts.post;
	var request = opts.request;

	mixpanel.track('Post Favorite', {
		distinct_id: user
		, user: user
		, post: post.pid
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.increment(
		user
		, 'post_favorite_count'
		, 1
	);

	mixpanel.people.increment(
		post.user
		, 'total_favorite_count'
		, 1
	);
};
