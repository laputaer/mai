
/**
 * api.js
 *
 * List backend api
 */

var Path = require('path-parser');

var qs = '?:skip&:limit&:range';

module.exports = {
	prefix: '/web/v1'
	, init: {
		global: '/global'
	}
	, home: {
		featured_clubs: '/clubs/featured'
		, featured_posts: new Path('/posts/featured' + qs)
		, recent_posts: new Path('/posts/recent' + qs)
	}
	, myClubs: {
		my_clubs: new Path('/clubs/owner' + qs)
		, joined_clubs: new Path('/clubs/member' + qs)
	}
	, clubProfile: {
		club_profile: new Path('/clubs/:slug/profile')
		, club_posts: new Path('/clubs/:slug/posts' + qs)
	}
	, userProfile: {
		user_profile: new Path('/users/:uid/profile')
		, user_posts: new Path('/users/:uid/posts' + qs)
	}
	, ranking: {
		hot_clubs: new Path('/clubs/hot' + qs)
		, top_clubs: new Path('/clubs/top' + qs)
		, recent_clubs: new Path('/clubs/recent' + qs)
	}
	, help: {}
	, featured_posts: {
		endpoint: new Path('/posts/featured' + qs)
	}
	, recent_posts: {
		endpoint: new Path('/posts/recent' + qs)
	}
	, my_clubs: {
		endpoint: new Path('/clubs/owner' + qs)
	}
	, joined_clubs: {
		endpoint: new Path('/clubs/member' + qs)
	}
	, club_posts: {
		endpoint: new Path('/clubs/:slug/posts' + qs)
	}
	, user_posts: {
		endpoint: new Path('/users/:uid/posts' + qs)
	}
	, hot_clubs: {
		endpoint: new Path('/clubs/hot' + qs)
	}
	, top_clubs: {
		endpoint: new Path('/clubs/top' + qs)
	}
	, recent_clubs: {
		endpoint: new Path('/clubs/recent' + qs)
	}
	, create_club: {
		endpoint: '/clubs'
	}
	, manage_club: {
		endpoint: new Path('/clubs/:slug')
	}
	, favorite_post: {
		endpoint: new Path('/posts/:pid/favorite')
	}
	, club_membership: {
		endpoint: new Path('/clubs/:slug/users')
	}
	, init_post: {
		endpoint: new Path('/clubs/:slug/posts')
	}
	, create_post: {
		endpoint: new Path('/clubs/:slug/posts/create')
	}
	, create_stash: {
		endpoint: '/apps'
	}
	, user_stash: {
		endpoint: new Path('/stash' + qs)
	}
	, stash_item: {
		endpoint: new Path('/stash/:sid')
	}
	, delete_stash: {
		endpoint: new Path('/stash/:sid')
	}
	, restore_stash: {
		endpoint: new Path('/stash/:sid')
	}
	, create_app: {
		endpoint: '/apps'
	}
	, user_apps: {
		endpoint: new Path('/apps' + qs)
	}
	, delete_app: {
		endpoint: new Path('/apps/:aid')
	}
	, restore_app: {
		endpoint: new Path('/apps/:aid')
	}
};
