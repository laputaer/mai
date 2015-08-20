
/**
 * api.js
 *
 * List backend api
 */

module.exports = {
	prefix: '/api/v1'
	, init: {
		global: '/global'
	}
	, home: {
		featured_clubs: '/clubs/featured'
		, featured_posts: '/posts/featured?skip=0&limit=20'
		, recent_posts: '/posts/recent?skip=0&limit=20'
	}
	, myClubs: {
		my_clubs: '/clubs/owner?skip=0&limit=20'
		, joined_clubs: '/clubs/member?skip=0&limit=20'
	}
	, clubProfile: {
		club_profile: '/clubs/:slug/profile'
		, club_posts: '/clubs/:slug/posts?skip=0&limit=20'
	}
	, userProfile: {
		user_profile: '/users/:uid/profile'
		, user_posts: '/users/:uid/posts?skip=0&limit=20'
	}
	, ranking: {
		hot_clubs: '/clubs/hot?skip=0&limit=20'
		, top_clubs: '/clubs/top?skip=0&limit=20'
		, recent_clubs: '/clubs/recent?skip=0&limit=20'
	}
	, help: {}
	, featured_posts: {
		endpoint: '/posts/featured'
	}
	, recent_posts: {
		endpoint: '/posts/recent'
	}
	, my_clubs: {
		endpoint: '/clubs/owner'
	}
	, joined_clubs: {
		endpoint: '/clubs/member'
	}
	, club_posts: {
		endpoint: '/clubs/:slug/posts'
	}
	, user_posts: {
		endpoint: '/users/:uid/posts'
	}
	, hot_clubs: {
		endpoint: '/clubs/hot'
	}
	, top_clubs: {
		endpoint: '/clubs/top'
	}
	, recent_clubs: {
		endpoint: '/clubs/recent'
	}
	, create_club: {
		endpoint: '/clubs'
	}
	, manage_club: {
		endpoint: '/clubs/:slug'
	}
	, favorite_post: {
		endpoint: '/posts/:pid/favorite'
	}
	, club_membership: {
		endpoint: '/clubs/:slug/users'
	}
	, init_post: {
		endpoint: '/clubs/:slug/posts'
	}
	, create_post: {
		endpoint: '/clubs/:slug/posts/create'
	}
	, user_stash: {
		endpoint: '/stash'
	}
	, app_password: {
		endpoint: '/app/password'
	}
};
