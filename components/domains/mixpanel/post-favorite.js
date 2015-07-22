
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
		distinct_id: user.uid
		, user: user.uid
		, post: post.pid
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.increment(
		user.uid
		, 'post_favorite_count'
		, 1
	);

	mixpanel.people.increment(
		post.user
		, 'total_favorite_count'
		, 1
	);
};
