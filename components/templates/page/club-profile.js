
/**
 * club-profile.js
 *
 * Template for club profile page
 */

var $ = require('../vdom');
var emitter = require('../emitter');
var immutable = require('../immutable');
var partialList = require('../partial-list');

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
	var club_posts = data.club_posts;
	var ui = data.ui;
	var client = data.client;
	var version = data.version.asset;

	// 1st section, plain title
	var club_posts_title = sectionTitleTemplate({
		title: 'section.titles.recent-posts'
		, key: 'recent-posts'
		, bottom: true
	});

	// trick to hide loaded post, so 1st load more is always fast
	club_posts = partialList(club_posts, 8, ui['load-club-posts']);

	// render posts, use immutable
	var club_posts_list = club_posts.map(function (post, i) {
		var opts = {
			num: i
			, version: version
			, view: 'club_posts'
			, client: client
			, cache: ui['load-club-posts'] > 50
		};

		return immutable(postTemplate, post, opts);
	});

	// load more button
	var club_posts_button = loadButtonTemplate({
		title: 'section.load.club-posts'
		, key: 'load-club-posts'
		, eventName: 'page:load:club-posts'
	});

	// page content
	var homeOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var home = $('div', homeOpts, [
		club_posts_title
		, club_posts_list
		, club_posts_button
	]);

	return home;
};
