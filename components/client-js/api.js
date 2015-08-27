
/**
 * api.js
 *
 * List backend api
 */

'use strict';

var Path = require('path-parser');

var qs = '?skip&limit&range';

module.exports = {
	// api prefix and default query value
	prefix: '/web/v1'
	, default_qs: {
		skip: 0
		, limit: 20
		, range: 0
	}
	// api groups
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
	// api routes
	, featured_posts: new Path('/posts/featured' + qs)
	, recent_posts: new Path('/posts/recent' + qs)
	, my_clubs: new Path('/clubs/owner' + qs)
	, joined_clubs: new Path('/clubs/member' + qs)
	, club_posts: new Path('/clubs/:slug/posts' + qs)
	, user_posts: new Path('/users/:uid/posts' + qs)
	, hot_clubs: new Path('/clubs/hot' + qs)
	, top_clubs: new Path('/clubs/top' + qs)
	, recent_clubs: new Path('/clubs/recent' + qs)
	, create_club: '/clubs'
	, manage_club: new Path('/clubs/:slug')
	, favorite_post: new Path('/posts/:pid/favorite')
	, club_membership: new Path('/clubs/:slug/users')
	, init_post: new Path('/clubs/:slug/posts')
	, create_post: new Path('/clubs/:slug/posts/create')
	, create_stash: '/stash'
	, user_stash: new Path('/stash' + qs)
	, stash_item: new Path('/stash/:sid')
	, create_app: '/apps'
	, user_apps: new Path('/apps' + qs)
	, app_item: new Path('/apps/:aid')
};
