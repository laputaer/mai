
/**
 * api.js
 *
 * List backend api
 */

module.exports = {
	init: {
		global: '/global'
	}
	, home: {
		featured_clubs: '/clubs/featured'
		, featured_posts: '/posts/featured?skip=0&limit=20'
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
};