
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
			, cache: ui['load-featured-posts'] > 20
		}

		return immutable(clubTemplate, club, opts);
	});

	// 2nd section, plain title
	var featured_posts_title = sectionTitleTemplate({
		title: 'section.titles.featured-posts'
		, key: 'featured-posts'
		, top: true
		, bottom: true
	});

	// trick to hide loaded post, so 1st load more is always fast
	featured_posts = partialList(featured_posts, 8, ui['load-featured-posts']);

	// render posts, use immutable
	var featured_posts_list = featured_posts.map(function (post, i) {
		var opts = {
			num: i
			, version: version
			, view: 'featured_posts'
			, client: client
			, cache: ui['load-featured-posts'] > 50
		};

		return immutable(postTemplate, post, opts);
	});

	var featured_posts_count = featured_posts_list.length;

	// load more button
	var featured_posts_button;
	if (!ui['load-featured-posts'] || featured_posts_count >= ui['load-featured-posts']) {
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
	]);

	return home;
};
