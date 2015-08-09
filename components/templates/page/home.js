
/**
 * home.js
 *
 * Template for home page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

var clubTemplate = require('../common/featured-club');
var postTemplate = require('../common/featured-post');
var sectionTitleTemplate = require('../common/section-title');
var loadButtonTemplate = require('../common/load-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	// common data
	var featured_clubs = data.featured_clubs;
	var featured_posts = data.featured_posts;
	var recent_posts = data.recent_posts;
	var ui = data.ui;
	var client = data.client;
	var version = data.version.asset;

	// 1st section, plain title
	var featured_clubs_title = sectionTitleTemplate({
		title: 'section.titles.featured-clubs'
		, key: 'featured-clubs'
	});

	// render clubs, use immutable
	var featured_clubs_list = featured_clubs.map(function (club) {
		// club list is static, we only cache it when user load feature posts
		var opts = {
			client: client
			, cache: ui['load-featured-posts'] > 0 || ui['load-recent-posts'] > 0
		}

		return immutable(clubTemplate, club, opts);
	});

	// 2nd section, tabs, always shown
	var featured_posts_title = sectionTitleTemplate({
		tabs: ['section.titles.featured-posts', 'section.titles.recent-posts']
		, key: 'featured-posts'
		, active: ui['featured-posts-section'] || 0
		, top: true
		, bottom: true
	});

	var featured_posts_list, featured_posts_button, recent_posts_list, recent_posts_button;

	// scenario 1: defaul tab active
	if (!ui['featured-posts-section']) {
		// trick to hide loaded post, so 1st load more is always fast
		featured_posts = partialList(featured_posts, 8, ui['load-featured-posts']);

		// render posts, use immutable
		featured_posts_list = featured_posts.map(function (post, i) {
			var opts = {
				num: i
				, version: version
				, view: 'featured_posts'
				, client: client
				, cache: ui['load-featured-posts'] > 0
			};

			return immutable(postTemplate, post, opts);
		});

		// load more button
		if (!ui['load-featured-posts']
			|| (featured_posts_list.length >= ui['load-featured-posts'] && featured_posts_list.length < 50)
		) {
			featured_posts_button = loadButtonTemplate({
				title: 'section.load.featured-posts'
				, key: 'load-featured-posts'
				, eventName: 'page:load:featured-post'
			});
		} else {
			featured_posts_button = loadButtonTemplate({
				title: 'section.load.eof-1'
				, key: 'load-featured-posts'
				, link: '/ranking'
			});
		}
	}

	// scenario 2: recent posts
	if (ui['featured-posts-section'] === 1) {
		// same tricks as scenario 1
		recent_posts = partialList(recent_posts, 8, ui['load-recent-posts']);

		recent_posts_list = recent_posts.map(function (post, i) {
			var opts = {
				num: i
				, version: version
				, view: 'recent_posts'
				, client: client
				, cache: ui['load-recent-posts'] > 0
			};

			return immutable(postTemplate, post, opts);
		});

		if (!ui['load-recent-posts']
			|| (recent_posts_list.length >= ui['load-recent-posts'] && recent_posts_list.length < 50)
		) {
			recent_posts_button = loadButtonTemplate({
				title: 'section.load.recent-posts'
				, key: 'load-recent-posts'
				, eventName: 'page:load:recent-post'
			});
		} else {
			recent_posts_button = loadButtonTemplate({
				title: 'section.load.eof-1'
				, key: 'load-recent-posts'
				, link: '/ranking'
			});
		}
	}

	// page content
	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		featured_clubs_title
		, featured_clubs_list
		, featured_posts_title
		, featured_posts_list
		, featured_posts_button
		, recent_posts_list
		, recent_posts_button
	]);

	return home;
};
