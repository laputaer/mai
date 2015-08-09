
/**
 * recent-posts.js
 *
 * API for getting recent posts
 */

var parser = require('url').parse;

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
var socialDomain = require('../domains/social');
var proxyUrl = require('../security/proxy');
var validate = require('../security/validation');

var filter_output = [
	'pid', 'title', 'summary'
	, 'user', 'user_name', 'user_login', 'user_avatar'
	, 'club', 'club_name', 'club_image', 'club_intro'
	, 'domain', 'url', 'image', 'doc_title', 'doc_summary'
	, 'fav_point', 'current_user_fav'
];

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory() {
	return middleware;
};

/**
 * Koa middleware
 *
 * @param   Function  next  Flow control
 * @return  Void
 */
function *middleware(next) {
	// optional flow control, so this can be used as component
	if (next) {
		yield next;
	}

	// STEP 1: prepare common data
	var config = this.config;
	var state = this.state;
	var uid = this.session.uid;
	var limit = 8;
	var skip = 0;

	if (next) {
		var result = yield validate(this.request.query, 'query');
		if (result.valid) {
			limit = parseInt(this.request.query.limit) || limit;
			skip = parseInt(this.request.query.skip) || skip;
		}
	}

	// STEP 2: get recent posts
	var recent_posts = yield clubsDomain.getRecentPosts({
		db: this.db
		, limit: limit
		, skip: skip
	});

	// STEP 3: get complementary user and club info
	var temp_slugs = []
	var temp_uids = [];
	var temp_favs = [];
	recent_posts.forEach(function (post) {
		temp_slugs.push(post.club);
		temp_uids.push(post.user);
		temp_favs.push({
			post: post.pid
			, user: uid
		});

		return post;
	});

	var temp_clubs = yield clubsDomain.getClubsByIds({
		db: this.db
		, slugs: temp_slugs
	});
	var temp_users = yield usersDomain.getUsersByIds({
		db: this.db
		, uids: temp_uids
	});

	var temp_favorites = {};
	if (temp_favs.length > 0) {
		temp_favorites = yield socialDomain.getFavoritePostsByIds({
			db: this.db
			, favs: temp_favs
		});
	}

	// STEP 4: append user and club info to output
	recent_posts = recent_posts.map(function (post) {
		var user = post.user;
		var slug = post.club;

		// post related
		if (post.embed) {
			// thumbnail
			if (Array.isArray(post.embed.image) && post.embed.image.length > 0) {
				var image = post.embed.image[0];
				post.image = proxyUrl({
					url: image.secure_url || image.url
					, key: config.proxy.key
					, base: state.image_base_url
				});
			}

			// title
			if (post.embed.title) {
				post.doc_title = post.embed.title;
			}

			// description
			if (post.embed.description) {
				post.doc_summary = post.embed.description.substr(0, 60) + '...';
			}

			// link and external domain
			if (post.embed.url) {
				var url = parser(post.embed.url);
				post.url = post.embed.url;
				post.domain = url.hostname;
			}
		}

		// user info
		post.user_name = temp_users[user].name;
		post.user_login = temp_users[user].login;
		post.user_avatar = proxyUrl({
			url: temp_users[user].avatar
			, key: config.proxy.key
			, base: state.image_base_url
		});

		// club info
		post.club_name = temp_clubs[slug].title;
		post.club_intro = temp_clubs[slug].intro;
		if (temp_clubs[slug].embed
			&& Array.isArray(temp_clubs[slug].embed.image)
			&& temp_clubs[slug].embed.image.length > 0
		) {
			image = temp_clubs[slug].embed.image[0];
			post.club_image = proxyUrl({
				url: image.secure_url || image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		// favorite info
		if (temp_favorites[post.pid]) {
			post.current_user_fav = true;
		} else {
			post.current_user_fav = false;
		}

		// filter output
		return filterAttributes(post, filter_output);
	});

	if (!next) {
		return recent_posts;
	}

	// STEP 5: output json
	this.state.json = getStandardJson(recent_posts);
};
