
/**
 * api-featured-posts.js
 *
 * API for getting featured posts
 */

var parser = require('url').parse;

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();
var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
var proxyUrl = require('../security/proxy');

var filter_output = [
	'pid', 'title', 'summary'
	, 'user', 'user_name', 'user_login', 'user_avatar'
	, 'club', 'club_name', 'club_image', 'club_intro'
	, 'domain', 'url', 'image', 'doc_title'
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
	if (next) {
		yield next;
	}

	// STEP 1: prepare common data
	var config = this.config;
	var state = this.state;

	var post_pids = config.showcase.posts;

	if (!next) {
		post_pids = post_pids.slice(0, 5);
	}

	// STEP 2: get featured posts
	var featured_posts = yield clubsDomain.getFeaturedPosts({
		db: this.db
		, pids: post_pids
	});

	// STEP 3: get complementary user and club info
	var temp_slugs = []
	var temp_uids = [];
	featured_posts.forEach(function (post) {
		temp_slugs.push(post.club);
		temp_uids.push(post.user);

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

	// STEP 4: append user and club info to output
	featured_posts = featured_posts.map(function (post) {
		var uid = post.user;
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

			// link and external domain
			if (post.embed.url) {
				var url = parser(post.embed.url);
				post.url = post.embed.url;
				post.domain = url.hostname;
			}
		}

		// user info
		post.user_name = temp_users[uid].name;
		post.user_login = temp_users[uid].login;
		post.user_avatar = proxyUrl({
			url: temp_users[uid].avatar
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
			var image = temp_clubs[slug].embed.image[0];
			post.club_image = proxyUrl({
				url: image.secure_url || image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		// filter output
		return filterAttributes(post, filter_output);
	});

	if (!next) {
		return featured_posts;
	}

	// STEP 5: output json
	this.state.json = getStandardJson(featured_posts);
};
